"use client";

import Link from "next/link";
import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Globe,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import HybridSection from "@/components/ui/HybridSection";
import { siteConfig } from "@/data/site";

const socialLinks = [
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
];

const quickLinks = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "Our Approach", href: "/our-approach" },
  { label: "Our Work", href: "/our-work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const ecosystemLinks = [
  { label: "AnduBer Partners", href: "/what-we-do#partners" },
  { label: "The Good Labs", href: "/what-we-do#labs" },
  { label: "The Gathering", href: "/what-we-do#foundation" },
];

const moreLinks = [
  { label: "Get Involved", href: "/join" },
  { label: "Governance", href: "/governance" },
];

export default function Footer() {
  return (
    <HybridSection
      variant="dark"
      as="footer"
      padding="none"
      className="border-t border-cream-200 dark:border-plum-800"
    >
      {/* Newsletter Section */}
      <div className="border-b border-cream-200 dark:border-plum-800">
        <Container>
          <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Join the <span className="text-gold-700 dark:text-gold-400">Movement</span>
              </h3>
              <p className="text-plum-600 dark:text-cream-300">
                Subscribe to stay updated on our work dismantling silos and building resilient systems.
              </p>
            </div>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-medium rounded-full px-6 py-3 bg-gold-400 text-plum-900 hover:bg-teal-400 hover:shadow-[0_10px_30px_rgba(212,170,106,0.3)] transition-all duration-300 active:scale-95"
            >
              Follow on LinkedIn
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Logo size="lg" className="mb-6" />
              <p className="text-plum-600 dark:text-cream-300 mb-4 leading-relaxed">
                <span className="text-gold-700 dark:text-gold-400 font-semibold">ANDU</span> (People) +{" "}
                <span className="text-teal-600 dark:text-teal-400 font-semibold">BER</span> (Good)
              </p>
              <p className="text-plum-600 dark:text-cream-300 mb-6 leading-relaxed text-sm max-w-md">
                A new breed of social enterprise dismantling silos and building
                resilient systems through applied imagination.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-cream-200 dark:bg-plum-800 text-plum-700 dark:text-cream-200 hover:bg-teal-500 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold-700 dark:text-gold-400">
                Explore
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-plum-600 dark:text-cream-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {moreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-plum-600 dark:text-cream-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ecosystem */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold-700 dark:text-gold-400">
                Three Engines
              </h4>
              <ul className="space-y-3">
                {ecosystemLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-plum-600 dark:text-cream-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold-700 dark:text-gold-400">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-plum-600 dark:text-cream-300">{siteConfig.address}</span>
                    <p className="text-sm text-plum-700 dark:text-cream-300/70">Headquarters | Global Reach</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-plum-600 dark:text-cream-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-plum-600 dark:text-cream-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <a
                    href={siteConfig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-plum-600 dark:text-cream-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    anduber.org
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-cream-200 dark:border-plum-800">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-plum-700 dark:text-cream-300/70">
            <p>&copy; {new Date().getFullYear()} AnduBer. All rights reserved.</p>
            <p className="italic text-plum-700 dark:text-cream-300/60">
              &ldquo;From Friction to Flow&rdquo;
            </p>
          </div>
        </Container>
      </div>
    </HybridSection>
  );
}
