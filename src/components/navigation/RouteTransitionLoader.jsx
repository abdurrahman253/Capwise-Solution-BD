"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const startedAt = useRef(0);
  const hideTimer = useRef(null);
  const safetyTimer = useRef(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    function stopAfterMinimum() {
      const elapsed = Date.now() - startedAt.current;
      const remaining = Math.max(0, 420 - elapsed);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        visibleRef.current = false;
        setVisible(false);
      }, remaining);
    }

    function start() {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(safetyTimer.current);
      startedAt.current = Date.now();
      visibleRef.current = true;
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

    function handlePopState() {
      start();
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(safetyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    if (!visibleRef.current) return;

    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(0, 420 - elapsed);
    window.clearTimeout(hideTimer.current);
    window.clearTimeout(safetyTimer.current);
    hideTimer.current = window.setTimeout(() => {
      visibleRef.current = false;
      setVisible(false);
    }, remaining);
  }, [pathname]);

  return (
    <div
      aria-hidden={!visible}
      aria-live="polite"
      role="status"
      className={`capwise-route-loader ${visible ? "is-visible" : ""}`}
    >
      <div className="capwise-route-loader__veil" />
      <div className="capwise-route-loader__content">
        <div className="capwise-route-loader__mark" aria-hidden="true">
          <span />
          <span />
        </div>
        <p>Preparing the next view</p>
        <div className="capwise-route-loader__track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
