"use client";

import { useEffect } from "react";

/**
 * Subtle gold glow that follows the cursor on desktop. Driven by CSS custom
 * properties on `<html>` (--cursor-x, --cursor-y) so layout work stays in
 * the GPU compositor. No-op on touch devices (no hover capability) and
 * when prefers-reduced-motion is set.
 */
export default function CursorGlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduceMotion.matches) return;

    const root = document.documentElement;
    root.classList.add("has-cursor-glow");

    let ticking = false;
    let nextX = window.innerWidth / 2;
    let nextY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${nextX}px`);
        root.style.setProperty("--cursor-y", `${nextY}px`);
        ticking = false;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      root.classList.remove("has-cursor-glow");
    };
  }, []);

  return null;
}
