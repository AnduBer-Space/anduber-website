import type { Metadata } from "next";
import { Inter, Playfair_Display, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ComeThruAnnouncement from "@/components/ui/ComeThruAnnouncement";
import StartHerePicker from "@/components/ui/StartHerePicker";
import ScrollThread from "@/components/ui/ScrollThread";
import CursorGlow from "@/components/ui/CursorGlow";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT"],
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

// Inline script: applied before React hydrates so users with a saved
// theme preference don't see a flash of the wrong theme.
const themeBootstrapScript = `(function(){try{var p=localStorage.getItem('anduber-theme');if(p!=='dark'&&p!=='light'&&p!=='hybrid')p='hybrid';var r=document.documentElement;r.classList.remove('theme-hybrid','theme-dark','theme-light','dark');r.classList.add('theme-'+p);if(p==='dark')r.classList.add('dark');}catch(e){document.documentElement.classList.add('theme-hybrid');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-full focus:bg-gold-400 focus:text-plum-900 focus:font-medium focus:outline-none"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main id="main-content" className="flex-1 overflow-x-hidden">{children}</main>
            <Footer />
            <BackToTop />
            <ComeThruAnnouncement />
            <StartHerePicker />
            <ScrollThread />
            <CursorGlow />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
