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

// The blog system now defines its own BlogPost interface in src/lib/blog.ts.

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** Optional pre-formatted credentials line shown next to the role. Generally
   *  unused — AnduBer favours a collective framing over individual credentials. */
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
