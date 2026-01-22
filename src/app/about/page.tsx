import { Metadata } from "next";
import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import MissionVision from "./components/MissionVision";
import CoreValues from "./components/CoreValues";
import TeamSection from "./components/TeamSection";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AnduBer's mission to empower East African communities through sustainable, community-led development initiatives and our unique distributed governance model.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <TeamSection />
      <CTA />
    </>
  );
}
