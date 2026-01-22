import { Metadata } from "next";
import GovernanceHero from "./components/GovernanceHero";
import GovernanceModel from "./components/GovernanceModel";
import GovernanceProcess from "./components/GovernanceProcess";
import GovernanceBenefits from "./components/GovernanceBenefits";
import GovernanceFAQ from "./components/GovernanceFAQ";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "Learn about AnduBer's distributed governance model that puts communities at the center of decision-making for lasting, sustainable development.",
};

export default function GovernancePage() {
  return (
    <>
      <GovernanceHero />
      <GovernanceModel />
      <GovernanceProcess />
      <GovernanceBenefits />
      <GovernanceFAQ />
      <CTA />
    </>
  );
}
