import type { Metadata } from "next";
import EcosystemHero from "./components/EcosystemHero";
import Ecosystem from "@/components/sections/Ecosystem";
import EcosystemDetail from "./components/EcosystemDetail";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Our Ecosystem",
  description:
    "Discover how AnduBer operates through three symbiotic engines: AnduBer Partners (consultancy), AnduBer Labs (R&D), and The Gathering (venture capital). A sustainable flywheel of innovation.",
  keywords: [
    "AnduBer Partners",
    "AnduBer Labs",
    "The Gathering",
    "social enterprise",
    "sustainable business model",
    "consultancy",
    "research and development",
    "venture capital",
  ],
};

export default function EcosystemPage() {
  return (
    <>
      <EcosystemHero />
      <Ecosystem />
      <EcosystemDetail />
      <CTA />
    </>
  );
}
