"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const MIN_VISIBLE_MS = 420;
const SAFETY_TIMEOUT_MS = 5000;

function isEligibleInternalLink(anchor) {
  if (
    !anchor ||
    anchor.target === "_blank" ||
    anchor.hasAttribute("download")
  ) {
    return false;
  }

  const href = anchor.getAttribute("href");

  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);

  if (url.origin !== window.location.origin) {
    return false;
  }

  // Query-only changes do not need a full route loader.
  return window.location.pathname !== url.pathname;
}

export default function RouteTransitionLoader() {
  const pathname = usePathname();

  const rootRef = useRef(null);
  const startedAt = useRef(0);
  const previousPath = useRef(pathname);
  const safetyTimer = useRef(null);
  const hideTimer = useRef(null);

  const [visible, setVisible] = useState(false);

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const card = root.querySelector("[data-loader-card]");
      const mark = root.querySelector("[data-loader-mark]");
      const spinner = root.querySelector("[data-loader-spinner]");
      const progress = root.querySelector("[data-loader-progress]");
      const copy = gsap.utils.toArray("[data-loader-copy]", root);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.killTweensOf([
        root,
        card,
        mark,
        spinner,
        progress,
        ...copy,
      ]);

      if (visible) {
        gsap.set(root, {
          autoAlpha: 1,
        });

        if (reduceMotion) {
          gsap.set(card, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          });

          gsap.set(progress, {
            scaleX: 0.82,
            transformOrigin: "left center",
          });

          return;
        }

        gsap
          .timeline()
          .fromTo(
            card,
            {
              autoAlpha: 0,
              y: 12,
              scale: 0.975,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.34,
              ease: "power3.out",
            },
          )
          .fromTo(
            mark,
            {
              autoAlpha: 0,
              scale: 0.84,
              rotate: -8,
            },
            {
              autoAlpha: 1,
              scale: 1,
              rotate: 0,
              duration: 0.34,
              ease: "back.out(1.8)",
            },
            "-=0.22",
          )
          .fromTo(
            copy,
            {
              autoAlpha: 0,
              x: 8,
            },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.28,
              stagger: 0.045,
              ease: "power2.out",
            },
            "-=0.22",
          )
          .fromTo(
            progress,
            {
              scaleX: 0,
              transformOrigin: "left center",
            },
            {
              scaleX: 0.82,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.18",
          );

        gsap.to(spinner, {
          rotate: 360,
          duration: 1.35,
          repeat: -1,
          ease: "none",
          transformOrigin: "center",
        });

        return;
      }

      if (reduceMotion) {
        gsap.set(root, {
          autoAlpha: 0,
        });

        return;
      }

      gsap
        .timeline()
        .to(progress, {
          scaleX: 1,
          duration: 0.14,
          ease: "power2.out",
        })
        .to(
          card,
          {
            autoAlpha: 0,
            y: -6,
            scale: 0.985,
            duration: 0.22,
            ease: "power2.in",
          },
          "+=0.03",
        )
        .set(root, {
          autoAlpha: 0,
        });
    },
    {
      dependencies: [visible],
      scope: rootRef,
      revertOnUpdate: false,
    },
  );

  useEffect(() => {
    function stopAfterMinimum() {
      const elapsed = Date.now() - startedAt.current;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

      window.clearTimeout(hideTimer.current);

      hideTimer.current = window.setTimeout(() => {
        setVisible(false);
      }, remaining);
    }

    function start() {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(safetyTimer.current);

      startedAt.current = Date.now();
      setVisible(true);

      safetyTimer.current = window.setTimeout(
        stopAfterMinimum,
        SAFETY_TIMEOUT_MS,
      );
    }

    function handleClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest("a");

      if (isEligibleInternalLink(anchor)) {
        start();
      }
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", start);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", start);

      window.clearTimeout(hideTimer.current);
      window.clearTimeout(safetyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) {
      return;
    }

    previousPath.current = pathname;

    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    window.clearTimeout(hideTimer.current);
    window.clearTimeout(safetyTimer.current);

    hideTimer.current = window.setTimeout(() => {
      setVisible(false);
    }, remaining);
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden={!visible}
      aria-live="polite"
      role="status"
      className="capwise-route-loader"
    >
      <div className="capwise-route-loader__backdrop" />

      <div
        className="capwise-route-loader__card"
        data-loader-card
      >
        <div
          className="capwise-route-loader__mark"
          data-loader-mark
        >
          <svg
            viewBox="0 0 96 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M70 18A34 34 0 1 0 70 82"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />

            <path
              d="M29 51L42 64L73 32"
              stroke="var(--loader-accent)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span
            className="capwise-route-loader__spinner"
            data-loader-spinner
          />
        </div>

        <div className="capwise-route-loader__copy">
          <p
            className="capwise-route-loader__brand"
            data-loader-copy
          >
            CAPWISE
          </p>

          <p
            className="capwise-route-loader__message"
            data-loader-copy
          >
            Preparing your next view
          </p>
        </div>

        <div className="capwise-route-loader__track">
          <span data-loader-progress />
        </div>
      </div>
    </div>
  );
}