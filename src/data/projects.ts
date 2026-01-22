import { Project } from "@/types";

// Projects will be added when real project data is available
export const projects: Project[] = [];

export const projectTypes = [
  { value: "all", label: "All Types" },
  { value: "water", label: "Water" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "agriculture", label: "Agriculture" },
  { value: "infrastructure", label: "Infrastructure" },
];

export const projectStatuses = [
  { value: "all", label: "All Status" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "upcoming", label: "Upcoming" },
];
