"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const RING_EASE = 0.18;
const MAGNETIC_STRENGTH = 0.25;
const MAGNETIC_MAX_OFFSET = 10;

// Restrained desktop-only cursor: a tight dot plus a lagging ring. Never
// hides the native cursor. Enlarges on pill CTAs (magnetic pull) and card
// links (`article`)-no global link hijacking, and no-ops entirely on
// touch/coarse pointers or when reduced motion is requested.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = enabled && !reduceMotion;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringInnerRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, has: false });
  const ringPos = useRef({ x: 0, y: 0 });
  const target = useRef({ mode: null, cx: 0, cy: 0 });
  const lastMode = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia(FINE_POINTER_QUERY);
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!active) return undefined;

    const onMove = (event) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.has = true;
    };

    const onOver = (event) => {
      const el = event.target.closest?.(".rounded-full, article");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      target.current = {
        mode: el.matches(".rounded-full") ? "magnetic" : "card",
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
    };

    const onOut = (event) => {
      const el = event.target.closest?.(".rounded-full, article");
      if (el && !el.contains(event.relatedTarget)) {
        target.current = { mode: null, cx: 0, cy: 0 };
      }
    };

    const onLeave = () => {
      pointer.current.has = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    let frame;
    const tick = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const inner = ringInnerRef.current;

      if (dot && ring && inner) {
        const { x, y, has } = pointer.current;
        dot.style.opacity = has ? "1" : "0";
        ring.style.opacity = has ? "1" : "0";

        if (has) {
          const mode = target.current.mode;
          let dotX = x;
          let dotY = y;

          if (mode === "magnetic") {
            const pullX = Math.max(
              Math.min((target.current.cx - x) * MAGNETIC_STRENGTH, MAGNETIC_MAX_OFFSET),
              -MAGNETIC_MAX_OFFSET,
            );
            const pullY = Math.max(
              Math.min((target.current.cy - y) * MAGNETIC_STRENGTH, MAGNETIC_MAX_OFFSET),
              -MAGNETIC_MAX_OFFSET,
            );
            dotX += pullX;
            dotY += pullY;
          }

          dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

          ringPos.current.x += (x - ringPos.current.x) * RING_EASE;
          ringPos.current.y += (y - ringPos.current.y) * RING_EASE;
          ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;

          if (mode !== lastMode.current) {
            inner.classList.toggle("scale-150", mode === "magnetic");
            inner.classList.toggle("scale-125", mode === "card");
            inner.classList.toggle("border-brand-gold", mode === "magnetic");
            inner.classList.toggle("border-brand-gold/45", mode !== "magnetic");
            lastMode.current = mode;
          }
        }
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <span
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-brand-gold opacity-0 transition-opacity duration-200 will-change-transform"
      />
      <span
        ref={ringRef}
        className="absolute left-0 top-0 size-9 opacity-0 transition-opacity duration-200 will-change-transform"
      >
        <span
          ref={ringInnerRef}
          className="block size-full rounded-full border border-brand-gold/45 transition-transform duration-300 ease-out"
        />
      </span>
    </div>
  );
}
