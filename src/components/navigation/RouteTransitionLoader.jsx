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
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    function start() {
      window.clearTimeout(finishTimer.current);
      setComplete(false);
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
    setActive(true);
    setComplete(true);
    finishTimer.current = window.setTimeout(() => {
      setActive(false);
      setComplete(false);
    }, 240);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[120] h-[3px] overflow-hidden transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`}
    >
      <span
        className={`block h-full origin-left bg-[linear-gradient(90deg,var(--brand-blue),var(--brand-gold))] shadow-[0_0_16px_rgba(212,175,55,.32)] transition-transform ${complete ? "duration-200 ease-out" : "duration-[1400ms] ease-out"}`}
        style={{ transform: `scaleX(${complete ? 1 : active ? 0.78 : 0})` }}
      />
    </div>
  );
}
