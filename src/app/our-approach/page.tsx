import type { Metadata } from "next";
import ApproachHero from "./components/ApproachHero";
import CrenshawExtension from "./components/CrenshawExtension";
import ApproachPillarsDeep from "./components/ApproachPillarsDeep";
import LogicModel from "./components/LogicModel";
import HomeContact from "@/components/sections/HomeContact";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "Applied Intersectionality is AnduBer's original methodology for solving entangled problems. We extend Kimberlé Crenshaw's intersectionality from people to systems — and translate it into Radical Collision, Applied Imagination, and Systemic Resilience.",
  keywords: [
    "applied intersectionality",
    "systems thinking",
    "Kimberlé Crenshaw",
    "theory of change",
    "logic model",
    "radical collision",
    "applied imagination",
    "systemic resilience",
  ],
};

export default function OurApproachPage() {
  return (
    <>
      <ApproachHero />
      <CrenshawExtension />
      <ApproachPillarsDeep />
      <LogicModel />
      <HomeContact />
    </>
  );
}
