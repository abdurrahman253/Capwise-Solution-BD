"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

function isEligibleInternalLink(anchor) {
  if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;

  const current = `${window.location.pathname}${window.location.search}`;
  const next = `${url.pathname}${url.search}`;
  return current !== next;
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
      if (!root) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const panels = root.querySelectorAll("[data-loader-panel]");
      const reveal = root.querySelectorAll("[data-loader-reveal]");
      const progress = root.querySelector("[data-loader-progress]");
      const orbit = root.querySelector("[data-loader-orbit]");

      if (visible) {
        gsap.killTweensOf([root, panels, reveal, progress, orbit]);
        gsap.set(root, { autoAlpha: 1 });
        if (reduceMotion) {
          gsap.set([panels, reveal, progress], { clearProps: "all" });
          return;
        }

        const timeline = gsap.timeline();
        timeline
          .fromTo(
            panels,
            { scaleY: 0, transformOrigin: "bottom" },
            { scaleY: 1, duration: 0.48, stagger: 0.04, ease: "power3.inOut" },
          )
          .fromTo(
            reveal,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.055, ease: "power3.out" },
            "-=0.15",
          )
          .fromTo(
            progress,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 0.86, duration: 1.2, ease: "power2.out" },
            "-=0.25",
          );

        gsap.to(orbit, {
          rotate: 360,
          duration: 2.4,
          repeat: -1,
          ease: "none",
          transformOrigin: "center",
        });
      } else {
        gsap.killTweensOf([root, panels, reveal, progress, orbit]);
        if (reduceMotion) {
          gsap.set(root, { autoAlpha: 0 });
          return;
        }
        gsap
          .timeline()
          .to(progress, { scaleX: 1, duration: 0.18, ease: "power2.out" })
          .to(reveal, { autoAlpha: 0, y: -8, duration: 0.2, stagger: 0.025 }, "-=0.05")
          .to(panels, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.42,
            stagger: 0.035,
            ease: "power3.inOut",
          })
          .set(root, { autoAlpha: 0 });
      }
    },
    { dependencies: [visible], scope: rootRef, revertOnUpdate: false },
  );

  useEffect(() => {
    function stopAfterMinimum() {
      const elapsed = Date.now() - startedAt.current;
      const remaining = Math.max(0, 640 - elapsed);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setVisible(false), remaining);
    }

    function start() {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(safetyTimer.current);
      startedAt.current = Date.now();
      setVisible(true);
      safetyTimer.current = window.setTimeout(stopAfterMinimum, 7000);
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
      if (isEligibleInternalLink(anchor)) start();
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
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(0, 640 - elapsed);
    window.clearTimeout(hideTimer.current);
    window.clearTimeout(safetyTimer.current);
    hideTimer.current = window.setTimeout(() => setVisible(false), remaining);
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden={!visible}
      aria-live="polite"
      role="status"
      className="capwise-route-loader"
    >
      <div className="capwise-route-loader__panel capwise-route-loader__panel--one" data-loader-panel />
      <div className="capwise-route-loader__panel capwise-route-loader__panel--two" data-loader-panel />
      <div className="capwise-route-loader__grid" />

      <div className="capwise-route-loader__content">
        <div className="capwise-route-loader__seal" data-loader-reveal>
          <svg viewBox="0 0 96 100" fill="none" aria-hidden="true">
            <path d="M70 18A34 34 0 1 0 70 82" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            <path d="M29 51L42 64L73 32" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="capwise-route-loader__orbit" data-loader-orbit />
        </div>

        <div className="text-center" data-loader-reveal>
          <p className="capwise-route-loader__brand">CAPWISE</p>
          <p className="capwise-route-loader__subbrand">Solution BD</p>
        </div>

        <div className="capwise-route-loader__rule" data-loader-reveal>
          <span data-loader-progress />
        </div>

        <div className="capwise-route-loader__meta" data-loader-reveal>
          <span>Preparing your next view</span>
          <span>Dhaka · Bangladesh</span>
        </div>
      </div>
    </div>
  );
}
