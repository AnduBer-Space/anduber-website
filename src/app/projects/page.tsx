import { Metadata } from "next";
import ProjectsPage from "./components/ProjectsPage";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore AnduBer's community development projects across East Africa, from water and sanitation to education and sustainable agriculture.",
};

export default function Projects() {
  return <ProjectsPage />;
}
