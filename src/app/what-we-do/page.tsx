import type { Metadata } from "next";
import EcosystemHero from "../ecosystem/components/EcosystemHero";
import Ecosystem from "@/components/sections/Ecosystem";
import EcosystemDetail from "../ecosystem/components/EcosystemDetail";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "AnduBer operates through three engines: AnduBer Partners advises foundations, NGOs and governments; The Good Labs builds solutions like ComeThru and Maji Maisha; The Gathering backs grassroots innovators with capital and networks.",
  keywords: [
    "AnduBer Partners",
    "AnduBer Labs",
    "The Good Labs",
    "The Gathering",
    "social enterprise",
    "consultancy",
    "research and development",
    "venture capital",
  ],
};

export default function WhatWeDoPage() {
  return (
    <>
      <EcosystemHero />
      <Ecosystem />
      <EcosystemDetail />
      <CTA />
    </>
  );
}
