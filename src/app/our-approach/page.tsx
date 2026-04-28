import type { Metadata } from "next";
import ModelHero from "../model/components/ModelHero";
import SiloTrap from "@/components/sections/SiloTrap";
import CoreModel from "@/components/sections/CoreModel";
import ThreePillars from "@/components/sections/ThreePillars";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "Applied Intersectionality is AnduBer's original methodology for solving entangled problems. We extend Crenshaw's intersectionality from people to systems — water connects to health connects to governance. Solve one in isolation, the others pull back.",
  keywords: [
    "applied intersectionality",
    "systems thinking",
    "silo trap",
    "radical collision",
    "applied imagination",
    "systemic resilience",
    "theory of change",
    "Crenshaw",
  ],
};

export default function OurApproachPage() {
  return (
    <>
      <ModelHero />
      <SiloTrap />
      <CoreModel />
      <ThreePillars />
      <CTA />
    </>
  );
}
