export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Plain-language tagline that follows the technical heading. */
  tagline?: string;
  description: string;
  shortDescription: string;
  location: string;
  status: "ongoing" | "completed" | "upcoming";
  type: "water" | "education" | "health" | "agriculture" | "infrastructure" | "mental-health";
  image: string;
  gallery: string[];
  impact: {
    label: string;
    value: number;
    suffix?: string;
    /** Optional pre-formatted display value (used when value isn't purely numeric). */
    display?: string;
  }[];
  /** Full case-study fields. Optional — older projects might only have description. */
  caseStudy?: {
    problem: string;
    approach: string;
    body: string[];
    learnings?: string[];
  };
  startDate: string;
  endDate?: string;
  featured: boolean;
  engine?: "partners" | "labs" | "gathering";
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** Optional formatted credentials line (e.g. "DVM, University of Nairobi · MIPH, Liverpool John Moores University"). */
  credentials?: string;
  bio: string;
  image: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}
