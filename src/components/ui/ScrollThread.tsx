"use client";

import { useEffect, useState } from "react";

/**
 * A thin vertical gold line that runs down the right edge of the page,
 * with a glowing dot that tracks scroll position. Reinforces the
 * "connection" theme — every section is on the same thread.
 *
 * Hidden on small screens (clutter), respects reduced-motion (becomes
 * a static line), hidden on the contact page.
 */
export default function ScrollThread() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const update = () => {
      setHidden(window.location.pathname.startsWith("/contact"));
    };
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const max =
          (document.documentElement.scrollHeight || 1) -
          (window.innerHeight || 1);
        const next = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0;
        setProgress(next);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className="hidden md:block fixed top-24 bottom-24 right-3 lg:right-5 z-30 pointer-events-none"
    >
      {/* Background line */}
      <div
        className="relative h-full w-px"
        style={{
          background:
            "linear-gradient(180deg, rgba(212, 170, 106, 0) 0%, rgba(212, 170, 106, 0.18) 12%, rgba(212, 170, 106, 0.18) 88%, rgba(212, 170, 106, 0) 100%)",
        }}
      >
        {/* Drawn-in segment that follows scroll progress */}
        <div
          className="absolute left-0 top-0 w-px"
          style={{
            height: `${progress * 100}%`,
            background:
              "linear-gradient(180deg, rgba(212, 170, 106, 0.7) 0%, rgba(45, 212, 191, 0.7) 100%)",
            transition: "height 80ms linear",
          }}
        />
        {/* Glowing dot at the tip */}
        <div
          className="absolute -translate-x-1/2 left-1/2 w-2 h-2 rounded-full"
          style={{
            top: `calc(${progress * 100}% - 4px)`,
            background: "#D4AA6A",
            boxShadow:
              "0 0 12px rgba(212, 170, 106, 0.7), 0 0 4px rgba(245, 230, 200, 0.6)",
            transition: "top 80ms linear",
          }}
        />
      </div>
    </div>
  );
}
