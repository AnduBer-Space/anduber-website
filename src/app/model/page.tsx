import type { Metadata } from "next";
import ModelHero from "./components/ModelHero";
import SiloTrap from "@/components/sections/SiloTrap";
import CoreModel from "@/components/sections/CoreModel";
import ThreePillars from "@/components/sections/ThreePillars";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Our Model",
  description:
    "Applied Intersectionality is AnduBer's core methodology. Learn how we dismantle silos through Radical Collision, Applied Imagination, and Systemic Resilience.",
  keywords: [
    "applied intersectionality",
    "systems thinking",
    "silo trap",
    "radical collision",
    "applied imagination",
    "systemic resilience",
    "theory of change",
  ],
};

export default function ModelPage() {
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
