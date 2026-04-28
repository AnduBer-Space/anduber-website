import type { Metadata } from "next";
import { projects } from "@/data/projects";
import WorkHero from "./components/WorkHero";
import CaseStudy from "./components/CaseStudy";
import FutureProjects from "./components/FutureProjects";
import HomeContact from "@/components/sections/HomeContact";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Two projects from The Good Labs: ComeThru, a WhatsApp-native mental wellness companion; and Maji Maisha, a community-owned, solar-powered water system serving 3,500+ people in Mbeere North, Kenya.",
  keywords: [
    "ComeThru",
    "Maji Maisha",
    "case study",
    "mental health",
    "WhatsApp",
    "water access",
    "solar water",
    "community ownership",
    "Mbeere North",
    "Gangara",
    "Kenya",
  ],
};

export default function OurWorkPage() {
  return (
    <>
      <WorkHero />
      {projects
        .filter((p) => p.featured)
        .map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      <FutureProjects />
      <HomeContact />
    </>
  );
}
