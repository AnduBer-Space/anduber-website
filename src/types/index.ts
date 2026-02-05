export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  location: string;
  status: "ongoing" | "completed" | "upcoming";
  type: "water" | "education" | "health" | "agriculture" | "infrastructure";
  image: string;
  gallery: string[];
  impact: {
    label: string;
    value: number;
    suffix?: string;
  }[];
  startDate: string;
  endDate?: string;
  featured: boolean;
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
