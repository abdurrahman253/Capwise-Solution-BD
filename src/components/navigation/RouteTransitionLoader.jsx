"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function isEligibleInternalLink(anchor) {
  if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  const url = new URL(anchor.href, window.location.href);
  return url.origin === window.location.origin && window.location.pathname !== url.pathname;
}

export default function RouteTransitionLoader() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const finishTimer = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(false);
  const [crawling, setCrawling] = useState(false);

  useEffect(() => {
    function start() {
      window.clearTimeout(finishTimer.current);
      const bar = barRef.current;
      if (bar) {
        bar.style.transition = "";
        bar.style.transform = "";
      }
      setCrawling(true);
      setActive(true);
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
      ) return;
      const anchor = event.target.closest("a");
      if (isEligibleInternalLink(anchor)) start();
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", start);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", start);
      window.clearTimeout(finishTimer.current);
    };
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const bar = barRef.current;
    if (bar) {
      // Freeze the bar at whatever progress the crawl animation had
      // actually reached, then transition smoothly from there to 100%,
      // instead of jumping to a hardcoded value (which would visibly
      // snap backward if the route resolved early).
      const liveTransform = getComputedStyle(bar).transform;
      bar.style.animation = "none";
      bar.style.transform = liveTransform === "none" ? "scaleX(0)" : liveTransform;
      void bar.offsetWidth;
    }

    setActive(true);
    setCrawling(false);

    requestAnimationFrame(() => {
      if (bar) {
        bar.style.transition = "transform 260ms cubic-bezier(0.4,0,0.2,1)";
        bar.style.transform = "scaleX(1)";
      }
    });

    finishTimer.current = window.setTimeout(() => {
      setActive(false);
      if (bar) {
        bar.style.animation = "";
        bar.style.transform = "";
        bar.style.transition = "";
      }
    }, 260);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[120] h-[3px] overflow-hidden transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`}
    >
      <span
        ref={barRef}
        className={`block h-full origin-left bg-[linear-gradient(90deg,var(--brand-blue),var(--brand-gold))] shadow-[0_0_16px_rgba(212,175,55,.32)] ${crawling ? "capwise-route-progress-crawl" : ""}`}
      />
    </div>
  );
}
