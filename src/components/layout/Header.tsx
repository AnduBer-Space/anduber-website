"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, SunMoon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, secondaryNavItems, siteConfig } from "@/data/site";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { useTheme, type ThemePreference } from "@/components/providers/ThemeProvider";

const THEME_OPTIONS: { value: ThemePreference; label: string; icon: typeof SunMoon }[] = [
  { value: "hybrid", label: "Hybrid", icon: SunMoon },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
];

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { preference, setPreference, mounted } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const current = THEME_OPTIONS.find((o) => o.value === preference) ?? THEME_OPTIONS[0];
  const CurrentIcon = current.icon;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current.label}. Open theme menu.`}
        title={`Theme: ${current.label}`}
        className={cn(
          "flex items-center gap-2 rounded-full transition-all duration-300",
          "border-2",
          compact ? "p-2" : "px-3 py-2",
          "border-token-glass",
          "hover:border-teal-500/60",
          mounted
            ? "bg-token-secondary"
            : "bg-cream-100 dark:bg-plum-800"
        )}
      >
        <CurrentIcon className="w-4 h-4 text-token-gold" />
        {!compact && mounted && (
          <span className="text-xs font-medium uppercase tracking-wide text-token-secondary">
            {current.label}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute right-0 mt-2 min-w-[160px] rounded-xl border overflow-hidden z-50",
              "shadow-lg backdrop-blur-md",
              "border-token-glass bg-token-secondary"
            )}
          >
            {THEME_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = opt.value === preference;
              return (
                <button
                  key={opt.value}
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setPreference(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left transition-colors",
                    active
                      ? "text-token-gold bg-cream-100/60 dark:bg-plum-800/60"
                      : "text-token-primary hover:bg-cream-100/50 dark:hover:bg-plum-800/50"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{opt.label}</span>
                  {active && <span className="text-xs">●</span>}
                </button>
              );
            })}
            <div className="border-t border-token-glass px-4 py-2 text-[11px] text-token-muted">
              Hybrid mixes per section.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { preference, mounted } = useTheme();

  // Header chrome stays dark in hybrid + dark modes; only light mode flips it.
  // Pre-mount we assume dark to avoid a flash for the common (hybrid) case.
  const chromeIsDark = !mounted || preference !== "light";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Body scroll lock + Escape close while the mobile menu is open.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          chromeIsDark && "dark",
          isScrolled ? "glass-dark py-3" : "bg-transparent py-5"
        )}
      >
        <Container>
          <nav className="flex items-center justify-between">
            <Link href="/" className="relative z-10" aria-label="AnduBer home">
              <Logo size="md" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300 link-hover",
                    pathname === item.href
                      ? "text-token-gold"
                      : "text-token-primary hover:text-token-teal"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="primary" size="sm" onClick={() => (window.location.href = "/contact")}>
                Partner With Us
              </Button>
            </div>

            {/* Mobile actions */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle compact />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg transition-colors text-token-primary hover:bg-cream-100/50 dark:hover:bg-plum-800/50"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile menu — full-screen overlay with large tap targets */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "fixed inset-0 z-[60] lg:hidden",
              chromeIsDark && "dark"
            )}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-md"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212, 170, 106, 0.16) 0%, rgba(30, 10, 20, 0.92) 60%, rgba(30, 10, 20, 0.96) 100%)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panel — full screen */}
            <motion.nav
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full overflow-y-auto"
            >
              <div className="flex flex-col min-h-full px-6 pt-24 pb-12 max-w-3xl mx-auto">
                {/* Primary nav — extra-large tap targets */}
                <ul className="space-y-1 mb-10 list-none p-0">
                  {navItems.map((item, index) => {
                    const active = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.04, duration: 0.4 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex items-center justify-between py-4 px-3 rounded-xl",
                            "font-serif text-3xl sm:text-4xl font-bold leading-none",
                            "min-h-[56px] transition-colors",
                            active
                              ? "text-token-gold"
                              : "text-cream-200 hover:text-token-gold"
                          )}
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight
                            className={cn(
                              "w-5 h-5 opacity-0 -translate-x-1 transition-all duration-300",
                              active ? "opacity-100 translate-x-0" : "group-hover:opacity-70 group-hover:translate-x-0"
                            )}
                            aria-hidden="true"
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Secondary links */}
                <div className="border-t border-plum-700/60 pt-6 mb-8">
                  <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-cream-300/70 mb-3">
                    More
                  </p>
                  <ul className="grid grid-cols-2 gap-2 list-none p-0">
                    {secondaryNavItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block py-3 px-3 rounded-lg text-base font-medium text-cream-200 hover:text-token-gold hover:bg-plum-800/50 transition-colors min-h-[44px]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct contact links */}
                <div className="space-y-2 mb-8">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center justify-between py-3 px-3 rounded-lg text-sm text-cream-300 hover:text-token-gold hover:bg-plum-800/50 transition-colors min-h-[44px]"
                  >
                    <span className="text-cream-300/70">Email</span>
                    <span className="font-medium">{siteConfig.email}</span>
                  </a>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 px-3 rounded-lg text-sm text-cream-300 hover:text-token-gold hover:bg-plum-800/50 transition-colors min-h-[44px]"
                  >
                    <span className="text-cream-300/70">LinkedIn</span>
                    <span className="font-medium inline-flex items-center gap-1">
                      /company/anduber <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </a>
                </div>

                {/* Primary CTA — bottom-anchored for thumb reach */}
                <div className="mt-auto pt-6">
                  <Button
                    variant="primary"
                    className="w-full min-h-[52px]"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = "/contact";
                    }}
                  >
                    Partner With Us
                  </Button>
                </div>
              </div>
            </motion.nav>

            {/* Close button — top-right, large tap target */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 z-[70] inline-flex items-center justify-center w-12 h-12 rounded-full bg-plum-800/70 hover:bg-plum-700 text-cream-200 border border-plum-700 backdrop-blur transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
