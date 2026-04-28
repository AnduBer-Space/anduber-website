import type { Metadata } from "next";
import ProjectsPage from "../projects/components/ProjectsPage";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "What Applied Intersectionality looks like in practice. ComeThru is a WhatsApp-based mental wellness companion. Maji Maisha is a community-owned, solar-powered water system serving 3,500+ people in Mbeere North.",
  keywords: [
    "ComeThru",
    "Maji Maisha",
    "mental health",
    "water access",
    "solar water",
    "community ownership",
    "Mbeere North",
    "Kenya",
  ],
};

export default function OurWorkPage() {
  return <ProjectsPage />;
}
