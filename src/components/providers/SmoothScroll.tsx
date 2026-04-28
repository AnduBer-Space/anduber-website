"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-driven smooth-scroll for desktop. Touch devices keep native scrolling
 * (better accessibility, kinetic feel matches OS expectations). Reduced-motion
 * users get native scroll too. The provider has no DOM output of its own.
 *
 * Anchor links continue to work — Lenis observes the scroll position and
 * lerps to the target after the browser&rsquo;s native jump.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch handling stays native — never override OS-level inertia or
      // accessibility gestures.
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      lerp: 0.09,
    });

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    // Tag the root so any CSS sensitive to JS-driven scroll can branch.
    document.documentElement.classList.add("has-smooth-scroll");

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      document.documentElement.classList.remove("has-smooth-scroll");
    };
  }, []);

  return null;
}
