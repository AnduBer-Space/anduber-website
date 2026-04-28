"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, SunMoon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/site";
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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-plum-900/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full gradient-section-simple"
              style={{ boxShadow: `-10px 0 40px var(--mobile-menu-shadow)` }}
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                          pathname === item.href
                            ? "bg-teal-500/10 text-token-gold border-l-2 border-teal-500"
                            : "text-token-primary hover:bg-cream-100/50 dark:hover:bg-plum-800/50 hover:text-token-teal"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-auto space-y-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-cream-200 dark:via-plum-700 to-transparent" />
                  <Button variant="primary" className="w-full" onClick={() => (window.location.href = "/contact")}>
                    Partner With Us
                  </Button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
