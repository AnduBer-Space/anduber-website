import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anduber.org"),
  title: {
    default: "AnduBer - An Engine for Applied Imagination",
    template: "%s | AnduBer",
  },
  description:
    "AnduBer is a new breed of social enterprise headquartered in Nairobi. ANDU (People) + BER (Good) - We dismantle silos and build resilient systems through applied imagination and intersectional thinking.",
  keywords: [
    "social enterprise",
    "systems thinking",
    "applied intersectionality",
    "Nairobi",
    "Kenya",
    "Africa",
    "innovation",
    "social impact",
    "consultancy",
    "research",
    "foundation",
  ],
  authors: [{ name: "AnduBer" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "AnduBer - An Engine for Applied Imagination",
    description:
      "A new breed of social enterprise dismantling silos and building resilient systems. From Friction to Flow.",
    url: "https://anduber.org",
    siteName: "AnduBer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnduBer - An Engine for Applied Imagination",
    description:
      "A new breed of social enterprise dismantling silos and building resilient systems. From Friction to Flow.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {/* Skip to content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-full focus:bg-gold-400 focus:text-plum-900 focus:font-medium focus:outline-none"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col bg-plum-900 text-cream-200 transition-colors duration-300 overflow-x-hidden">
          <Header />
          <main id="main-content" className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
