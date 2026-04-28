"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, X, Coins, Building2, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating "Start Here" picker. Bottom-right corner of every page (except
 * /contact, where it would be redundant). Click → small panel with three
 * pathways. Each pathway routes to /contact with an `intent` query param
 * so the contact form can pre-select inquiry type and pre-fill subject.
 */

type Pathway = {
  intent: "fund" | "advise" | "back";
  title: string;
  Icon: typeof Coins;
  /** Optional in-page anchor to scroll to before navigating to /contact. */
  homeAnchor: string;
};

const PATHWAYS: Pathway[] = [
  {
    intent: "fund",
    title: "I want to fund this work",
    Icon: Coins,
    homeAnchor: "#three-engines",
  },
  {
    intent: "advise",
    title: "My organisation needs strategy help",
    Icon: Building2,
    homeAnchor: "#three-engines",
  },
  {
    intent: "back",
    title: "I have an innovation that needs backing",
    Icon: Lightbulb,
    homeAnchor: "#three-engines",
  },
];

export default function StartHerePicker() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide on the contact page where the picker would just be a duplicate.
  useEffect(() => {
    const update = () => {
      setHidden(typeof window !== "undefined" && window.location.pathname.startsWith("/contact"));
    };
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (hidden) return null;

  const choose = (p: Pathway) => {
    setOpen(false);
    // Route to contact with the intent. The contact form picks it up and
    // pre-selects inquiry type + pre-fills the subject.
    router.push(`/contact?intent=${p.intent}`);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-label="What brings you here?"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-[68px] right-0 w-[min(360px,calc(100vw-2.5rem))]
                       rounded-2xl border border-gold-400/40
                       bg-plum-900/95 backdrop-blur-md
                       shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_50px_rgba(212,170,106,0.18)]
                       overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-gold-300 mb-1">
                  Start here
                </p>
                <h3 className="font-serif text-lg text-cream-200 leading-tight">
                  What brings you here?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1 rounded-full text-cream-300/80 hover:text-gold-300 hover:bg-plum-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="px-2 pb-3">
              {PATHWAYS.map((p) => (
                <li key={p.intent}>
                  <button
                    type="button"
                    onClick={() => choose(p)}
                    className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left
                               text-cream-200 hover:bg-plum-800/80 hover:text-gold-200
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
                               transition-colors"
                  >
                    <span className="w-9 h-9 rounded-lg bg-gold-400/15 text-gold-300 flex items-center justify-center shrink-0">
                      <p.Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-sm leading-snug">{p.title}</span>
                    <ArrowRight className="w-4 h-4 text-cream-300/60 group-hover:text-gold-300 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="px-5 pb-4 text-[11px] text-cream-300/60 italic font-accent">
              We&rsquo;ll pre-fill the contact form for you.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={open ? "Close Start Here" : "Open Start Here pathways"}
        className={cn(
          "group relative inline-flex items-center gap-2 px-4 py-3 rounded-full",
          "bg-gold-400 text-plum-900 font-medium text-sm shadow-lg",
          "hover:bg-gold-300 hover:shadow-glow-gold active:scale-95",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-plum-900"
        )}
      >
        <span className="relative flex items-center justify-center w-5 h-5">
          <Compass className="w-5 h-5" aria-hidden="true" />
          {/* Soft pulsing ring to draw the eye on first visit */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-2 ring-plum-900/30 animate-ping"
            style={{ animationDuration: "2.4s" }}
          />
        </span>
        <span className="hidden sm:inline">Start here</span>
      </button>
    </div>
  );
}
