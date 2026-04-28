"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight, Heart } from "lucide-react";

// Bumped key so visitors who dismissed the launch popup before the redesign
// see the relaunched version once. Increment again when we re-pin the popup.
const STORAGE_KEY = "anduber-comethru-popup-seen-v2";
const COMETHRU_URL = "https://comethru.anduber.org";

export default function ComeThruAnnouncement() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {}

    if (seen) {
      setShowBadge(true);
      return;
    }

    const timer = setTimeout(() => setShowPopup(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setShowBadge(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  };

  const handleLearnMore = () => {
    closePopup();
    if (typeof window !== "undefined") {
      // Post-redesign anchor: the homepage Three Engines section is what the
      // brief replaced the old "ecosystem" anchor with.
      if (window.location.pathname === "/") {
        const el = document.getElementById("three-engines");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = "/#three-engines";
      }
    }
  };

  useEffect(() => {
    if (!showPopup) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopup]);

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="comethru-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="comethru-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-plum-900/70 backdrop-blur-md"
            />

            {/* Modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg sm:max-w-xl"
            >
              {/* Soft outer glow */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(212,170,106,0.45) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(26,123,122,0.4) 0%, transparent 60%)",
                }}
              />

              {/* Glass card */}
              <div
                className="relative overflow-hidden rounded-3xl border border-gold-400/30 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(42,14,26,0.85) 0%, rgba(30,10,20,0.92) 60%, rgba(61,21,37,0.85) 100%)",
                }}
              >
                {/* Decorative orbs inside card */}
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-40 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,170,106,0.5) 0%, transparent 70%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full opacity-40 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(26,123,122,0.5) 0%, transparent 70%)",
                  }}
                />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

                {/* Close button */}
                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close announcement"
                  className="absolute top-4 right-4 z-10 p-2 rounded-full text-cream-200/80 hover:text-cream-200 bg-plum-900/40 hover:bg-plum-900/70 border border-cream-200/10 hover:border-gold-400/40 transition-all duration-300 backdrop-blur-sm"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative p-6 sm:p-10">
                  {/* Title pill */}
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-200 text-xs sm:text-sm font-medium tracking-wide uppercase">
                      <Sparkles className="w-3.5 h-3.5" aria-hidden />
                      <span id="comethru-title">Our Flagship Innovation is LIVE!</span>
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center text-cream-200 mb-3">
                    Introducing{" "}
                    <span className="text-gradient-gold">ComeThru</span>
                  </h2>

                  {/* Tagline */}
                  <p className="text-center text-teal-300 text-base sm:text-lg font-medium mb-5">
                    Revolutionising Mental Health Support
                  </p>

                  {/* Divider */}
                  <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

                  {/* Description */}
                  <p className="text-center text-cream-300 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                    ComeThru is AnduBer&apos;s groundbreaking AI companion
                    platform, making mental health support accessible,
                    stigma-free, and deeply personal. Built by{" "}
                    <span className="text-gold-300 font-medium">
                      The Good Labs
                    </span>{" "}
                    with our{" "}
                    <span className="italic text-cream-200">
                      &ldquo;No Code Without Community&rdquo;
                    </span>{" "}
                    philosophy.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <a
                      href={COMETHRU_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        try {
                          localStorage.setItem(STORAGE_KEY, "true");
                        } catch {}
                      }}
                      className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-gold-400 text-plum-900 font-semibold text-sm sm:text-base shadow-[0_10px_30px_rgba(212,170,106,0.35)] hover:shadow-[0_15px_40px_rgba(212,170,106,0.5)] hover:bg-gold-300 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                    >
                      Experience ComeThru
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    <button
                      type="button"
                      onClick={handleLearnMore}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-teal-400/40 text-teal-300 hover:text-cream-200 hover:bg-teal-500/10 hover:border-teal-400/70 font-medium text-sm sm:text-base transition-all duration-300"
                    >
                      Learn More
                    </button>
                  </div>

                  {/* Footer ribbon */}
                  <div className="mt-7 flex items-center justify-center gap-2 text-xs text-cream-300/70">
                    <Heart className="w-3.5 h-3.5 text-teal-300" aria-hidden />
                    <span>A milestone for AnduBer &amp; The Good Labs</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent floating badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.a
            key="comethru-badge"
            href={COMETHRU_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full backdrop-blur-md border border-gold-400/40 text-cream-200 hover:text-plum-900 hover:bg-gold-300 hover:border-gold-300 shadow-[0_10px_30px_rgba(0,0,0,0.3),0_0_25px_rgba(212,170,106,0.25)] transition-all duration-300 max-w-[calc(100vw-3rem)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(42,14,26,0.85) 0%, rgba(30,10,20,0.9) 100%)",
            }}
            aria-label="ComeThru is now live — open in new tab"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
            </span>
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
              <span className="text-gold-300 group-hover:text-plum-900 font-semibold">
                NEW:
              </span>{" "}
              ComeThru is Live!
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
