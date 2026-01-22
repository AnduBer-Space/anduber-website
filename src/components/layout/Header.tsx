"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/site";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
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
          isScrolled
            ? "glass-dark py-3"
            : "bg-transparent py-5"
        )}
      >
        <Container>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300 link-hover",
                    pathname === item.href
                      ? "text-gold-400"
                      : "text-cream-200 hover:text-teal-400"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  theme === "dark"
                    ? "text-cream-200 hover:bg-plum-700 hover:text-gold-400"
                    : "text-plum-900 hover:bg-cream-100 hover:text-teal-500"
                )}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <Button variant="primary" size="sm">
                Get Involved
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  theme === "dark"
                    ? "text-cream-200 hover:bg-plum-700"
                    : "text-plum-900 hover:bg-cream-100"
                )}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  theme === "dark"
                    ? "text-cream-200 hover:bg-plum-700"
                    : "text-plum-900 hover:bg-cream-100"
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-plum-900/90 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full"
              style={{
                background: "linear-gradient(180deg, #1E0A14 0%, #2A0E1A 100%)",
                boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                          pathname === item.href
                            ? "bg-teal-500/10 text-gold-400 border-l-2 border-teal-500"
                            : "text-cream-200 hover:bg-plum-800 hover:text-teal-400"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-auto space-y-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-plum-700 to-transparent" />
                  <Button variant="primary" className="w-full">
                    Get Involved
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
