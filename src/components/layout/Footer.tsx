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
import { siteConfig } from "@/data/site";

const socialLinks = [
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Model", href: "/model" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Insights", href: "/blog" },
  { label: "Join Us", href: "/join" },
  { label: "Contact", href: "/contact" },
];

const ecosystemLinks = [
  { label: "AnduBer Partners", href: "/ecosystem#partners" },
  { label: "AnduBer Labs", href: "/ecosystem#labs" },
  { label: "The Gathering", href: "/ecosystem#foundation" },
];

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-cream-200 border-t border-plum-800">
      {/* Newsletter Section */}
      <div className="border-b border-plum-800">
        <Container>
          <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Join the <span className="text-gold-400">Movement</span>
              </h3>
              <p className="text-cream-300">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Logo size="lg" className="mb-6" />
              <p className="text-cream-300 mb-4 leading-relaxed">
                <span className="text-gold-400 font-semibold">ANDU</span> (People) +{" "}
                <span className="text-teal-400 font-semibold">BER</span> (Good)
              </p>
              <p className="text-cream-300 mb-6 leading-relaxed text-sm">
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
                    className="p-2 rounded-full bg-plum-800 text-cream-200 hover:bg-teal-500 hover:text-plum-900 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold-400">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream-300 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ecosystem */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold-400">
                Our Ecosystem
              </h4>
              <ul className="space-y-3">
                {ecosystemLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream-300 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold-400">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream-300">{siteConfig.address}</span>
                    <p className="text-sm text-plum-500">Headquarters | Global Reach</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-cream-300 hover:text-teal-400 transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-cream-300 hover:text-teal-400 transition-colors"
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
                    className="text-cream-300 hover:text-teal-400 transition-colors"
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
      <div className="border-t border-plum-800">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-plum-500">
            <p>&copy; {new Date().getFullYear()} AnduBer. All rights reserved.</p>
            <p className="italic text-cream-300/60">
              &ldquo;From Friction to Flow&rdquo;
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
