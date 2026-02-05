import { NavItem, FAQ } from "@/types";

export const siteConfig = {
  name: "AnduBer",
  tagline: "An Engine for Applied Imagination",
  description:
    "AnduBer is a new breed of social enterprise headquartered in Nairobi. Our name—ANDU (People) + BER (Good)—is a deliberate fusion of two African dialects, symbolizing our core belief that innovation happens at the intersection. We are a collective of systems thinkers, artists, scientists, and community leaders united by one mission: to dismantle silos and build resilient systems.",
  url: "https://anduber.org",
  email: "info@anduberinnovate.space",
  phone: "+254107025817",
  address: "Nairobi, Kenya",
  nameMeaning: "ANDU (People) + BER (Good) - A fusion of two African dialects, symbolizing our core belief that innovation happens at the intersection.",
  socials: {
    linkedin: "https://www.linkedin.com/company/anduber/",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Model", href: "/model" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Insights", href: "/blog" },
  { label: "Join Us", href: "/join" },
  { label: "Governance", href: "/governance" },
  { label: "Contact", href: "/contact" },
];

export const faqs: FAQ[] = [
  {
    question: "What does AnduBer mean?",
    answer:
      "AnduBer is a deliberate fusion of two African dialects: ANDU (People) + BER (Good). This name symbolizes our core belief that innovation happens at the intersection—when diverse people come together with good intentions.",
  },
  {
    question: "What is Applied Intersectionality?",
    answer:
      "Applied Intersectionality is our core model. It's the hypothesis that when we unite 'Good People' across disciplines, cultures, and sectors with diverse expertise, and equip them with systems-thinking tools, we unlock solutions that are more resilient, human-centric, and effective.",
  },
  {
    question: "What is the Silo Trap?",
    answer:
      "The Silo Trap is the challenge we address: the world's biggest problems—pandemics, climate change, inequality—are entangled, yet the systems designed to solve them are fragmented. Scientists don't talk to artists. Policymakers don't listen to communities. This linear thinking leads to 'band-aid' solutions.",
  },
  {
    question: "How does AnduBer generate revenue?",
    answer:
      "We operate through three symbiotic arms: AnduBer Partners (consultancy that funds operations), AnduBer Labs (R&D for IP and innovation), and The Gathering (venture capital funding overlooked innovators). Each arm powers the others in a sustainable flywheel.",
  },
  {
    question: "Where does AnduBer operate?",
    answer:
      "Our headquarters is in Nairobi, Kenya, but our reach is global. Our social projects specifically serve vulnerable communities across Africa, while our consultancy work and research have worldwide impact.",
  },
  {
    question: "How can I collaborate with AnduBer?",
    answer:
      "There are several ways: Partner with AnduBer Partners for strategic consulting, collaborate with AnduBer Labs on research, support The Gathering's venture initiatives, or join our network of systems thinkers, artists, scientists, and community leaders.",
  },
];

// Mission and Vision
export const mission = "To dismantle silos and catalyze resilient, human-centric solutions to complex global challenges by colliding diverse expertise and applied creativity.";

export const vision = "A world where complex problems—from climate resilience to health equity—are met with thriving, systemic innovations that leave no one behind.";

// Core Model - Applied Intersectionality
export const coreHypothesis = {
  premise: "IF we unite 'Good People' across disciplines, cultures, and sectors with diverse expertise...",
  method: "AND equip them with systems-thinking tools to reimagine how the world works...",
  result: "THEN we unlock 'Good' solutions that are more resilient, human-centric, and effective...",
  outcome: "A world where challenges are met with systemic innovation that leaves no one behind.",
};

// Three Pillars - Theory of Change
export const pillars = [
  {
    id: "collision",
    title: "Radical Collision",
    subtitle: "The Input",
    description: "Collide 'unusual suspects'—poets with policymakers, elders with engineers, artists with scientists, youth with traditional leaders.",
    quote: "We stop solving problems in isolation.",
    icon: "collision",
    color: "teal",
  },
  {
    id: "imagination",
    title: "Applied Imagination",
    subtitle: "The Process",
    description: "Equip teams with systems-thinking tools and creative frameworks. Move from 'what if' to 'how to' using Systems Mapping and Design Justice methodologies.",
    quote: "From 'what if' to 'how to'",
    icon: "imagination",
    color: "gold",
  },
  {
    id: "resilience",
    title: "Systemic Resilience",
    subtitle: "The Output",
    description: "Produce holistic solutions addressing interconnected issues—health, governance, livelihoods, and dignity—all simultaneously. Community-owned and self-sustaining.",
    quote: "Community-Owned. Self-Sustaining.",
    icon: "resilience",
    color: "copper",
  },
];

// The Silo Trap - Problems we address
export const siloProblems = [
  {
    title: "Fragmented Funding",
    description: "Grants target symptoms, not systems. Resources are scattered across disconnected initiatives.",
  },
  {
    title: "Restricted Interventions",
    description: "Solutions designed in isolation fail in the messy complexity of real communities.",
  },
  {
    title: "Band-Aid Solutions",
    description: "Programs collapse when funding ends. Root causes never addressed, cycles of dependency continue.",
  },
];

// Ecosystem - Three Symbiotic Engines
export const ecosystemArms = [
  {
    id: "partners",
    title: "AnduBer Partners",
    subtitle: "The Strategic Engine",
    type: "Consultancy",
    revenueModel: "Earned Revenue (funds core operations)",
    description: "We help organizations (NGOs, Foundations, Governments) navigate complexity. We don't just advise; we embed with teams to co-create intersectional strategies.",
    services: [
      "Strategic Design: Reimagining organizational approaches through intersectional lens",
      "Systems Mapping: Visualizing complex relationships and leverage points",
      "Facilitation: Leading multi-stakeholder dialogue and collaboration",
      "Capacity Building: Training teams in systems thinking and applied creativity",
    ],
    color: "teal",
  },
  {
    id: "labs",
    title: "AnduBer Labs",
    subtitle: "The Innovation Engine",
    type: "Research & Development",
    revenueModel: "IP Licensing, Research Grants",
    description: "Our experimental playground where unconventional ideas meet rigorous methodology. We develop frameworks, tools, and approaches that can be applied across contexts.",
    services: [
      "Framework Development: Creating replicable models for systemic change",
      "Prototyping: Testing innovative solutions in controlled environments",
      "Research: Generating evidence for what works at intersections",
      "Open Source Tools: Sharing methodologies for broader impact",
    ],
    color: "gold",
  },
  {
    id: "foundation",
    title: "The Gathering",
    subtitle: "The Impact Engine",
    type: "Venture Capital",
    revenueModel: "Venture Capital",
    description: "Funding the often forgotten or overlooked innovators across Africa. We back visionary entrepreneurs and community-driven solutions that traditional investors miss.",
    services: [
      "Community Health: Integrating health with livelihoods and dignity",
      "Education: Systems-thinking approaches to learning",
      "Economic Empowerment: Sustainable livelihoods rooted in local context",
      "Climate Resilience: Community-led adaptation strategies",
    ],
    color: "copper",
  },
];

// Key phrases
export const keyPhrases = {
  friction: "From Friction to Flow — We turn 'what if' into 'how to'",
  connective: "AnduBer acts as the connective tissue, turning friction into flow.",
  fusion: "The Fusion of Cultures",
};
