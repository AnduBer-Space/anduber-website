import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-plum-900 text-cream-200 transition-colors duration-300">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
