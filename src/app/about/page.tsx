import { Metadata } from "next";
import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import MissionVision from "./components/MissionVision";
import CoreValues from "./components/CoreValues";
import TeamSection from "./components/TeamSection";
import HomeContact from "@/components/sections/HomeContact";

export const metadata: Metadata = {
  title: "About",
  description:
    "AnduBer means ANDU (people) + BER (good) — a fusion of two African cultures, and our core belief that innovation happens at the intersection. We're a collective bringing the rooms that don't normally meet into the same conversation.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <TeamSection />
      <HomeContact />
    </>
  );
}
