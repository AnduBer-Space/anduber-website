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
    "AnduBer means ANDU (people, in Kĩmbeere) + BER (good, in Dholuo) — innovation at the intersection. Founded by Dr. Victor Mugambi Nyaga (DVM, MIPH) to bring the rooms that don't normally meet into the same conversation.",
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
