import { Project } from "@/types";

/**
 * Featured projects shown on /our-work and (in summary form) on the homepage.
 * Numbers come from the field, not marketing copy. Update with care.
 */
export const projects: Project[] = [
  {
    id: "comethru",
    slug: "comethru",
    title: "ComeThru",
    tagline:
      "A mental wellness companion that meets people where they already are — on WhatsApp.",
    shortDescription:
      "WhatsApp-native mental wellness companion designed with therapists, peer counsellors and people with lived experience.",
    description:
      "Mental health support sits behind clinics, payment plans and stigma — the people who need it most aren't there. ComeThru is an AI companion delivered through the most-used app in Africa: private, low-bandwidth, available at 2am.",
    location: "Pan-African (digital)",
    status: "ongoing",
    type: "mental-health",
    image: "/images/logo.png",
    gallery: [],
    engine: "labs",
    impact: [
      { label: "Channel", value: 0, display: "WhatsApp-native" },
      { label: "Availability", value: 0, display: "24 / 7" },
      { label: "Languages", value: 0, display: "Multilingual" },
      { label: "App install required", value: 0, display: "None" },
    ],
    caseStudy: {
      problem:
        "Mental health systems in East Africa are clinic-bound, English-first, and gated by stigma. Most people who need support never make a first appointment. Those who do face waitlists measured in months. Telehealth solutions assume a smartphone, an app store, an appointment, and the language of the platform — assumptions that exclude the majority of the population that mental-health frameworks claim to serve.",
      approach:
        "We built where people already are. WhatsApp is the de-facto operating system for communication across the continent — it works on entry-level phones, it doesn't require an install, and people are already comfortable inside it. ComeThru is a companion that lives inside that channel, designed in close collaboration with therapists, peer counsellors, and people with lived experience of the conditions it supports.",
      body: [
        "The product isn't a chatbot trying to replace a therapist. It is a triage layer, a check-in companion, and a structured set of self-guided exercises grounded in protocols clinicians already use. When someone needs a human, ComeThru hands them off — to a peer counsellor for some classes of need, to a referral pathway for clinical cases, to crisis resources when safety is at stake.",
        "Privacy was a first-order design constraint. Conversations are end-to-end encrypted by the channel itself; the companion stores only what is necessary to provide continuity, and discloses that storage in plain language. Language and tone were calibrated by a working group that included Sheng-speakers and rural users — not just a Nairobi product team.",
        "We're rolling ComeThru out in phases against a research protocol. Early indicators we're tracking: completion rates of self-guided modules; time-to-first-handoff for cases that warrant human escalation; user-reported usefulness across age, language and rural/urban segments. Outputs we are explicitly not optimising for: total messages exchanged, daily active users, or any other engagement metric that risks becoming a proxy for product success.",
      ],
      learnings: [
        "WhatsApp is not a workaround. For most of our users it is the canonical app for communication; designing for it primarily — not as a fallback — surfaced design decisions a smartphone-first product would have missed.",
        "Peer counsellors are an underused resource. Triage that routes appropriate cases to trained peers (rather than queuing everything for clinicians) shortens time-to-first-help by an order of magnitude.",
      ],
    },
    startDate: "2024-09-01",
    featured: true,
  },
  {
    id: "maji-maisha",
    slug: "maji-maisha",
    title: "Maji Maisha",
    tagline:
      "Solar-powered water systems owned and run by the community.",
    shortDescription:
      "Three solar water hubs serving 3,500+ people across Gangara, Mbeere North — designed for community ownership in 18 months, with women holding 50% of governance seats.",
    description:
      "In Mbeere North, families walked four hours for water. Diesel boreholes existed but stalled when fuel prices spiked. Maji Maisha is three solar-powered hubs designed with the community, governed by a board with 50% women's seats, on an 18-month path to full community ownership.",
    location: "Gangara, Mbeere North, Kenya",
    status: "ongoing",
    type: "water",
    image: "/images/logo.png",
    gallery: [],
    engine: "labs",
    impact: [
      { label: "people served", value: 3500, suffix: "+" },
      { label: "solar-powered hubs", value: 3 },
      { label: "women in leadership", value: 50, suffix: "%" },
      { label: "operating cost reduction", value: 75, suffix: "%" },
      { label: "litres of diesel burned", value: 0 },
      { label: "months to community ownership", value: 18 },
    ],
    caseStudy: {
      problem:
        "Mbeere North is semi-arid. The closest reliable water for many families was a four-hour round trip, almost always walked by women and girls. Boreholes did exist, but they ran on diesel, and diesel prices in this part of Kenya are volatile. When fuel costs spiked, pumps stalled, communities reverted to walking, and the previous decade of donor investment was effectively erased.",
      approach:
        "We co-designed three solar-powered hubs with the community. Solar removes the diesel dependency — once the panels are up, the marginal cost of pumping water approaches zero. But hardware was the smaller half of the project. The harder half was governance.",
      body: [
        "From day one we negotiated a community-ownership transfer schedule with a stated end date. Eighteen months from commissioning, AnduBer would step out and the community board would step fully in. That schedule wasn't aspirational — it was the contract. We've held to it.",
        "The board itself was structured deliberately: 50% of seats reserved for women's representatives. Women carry the water in this region; ownership of the water system without women in governance was a structural absurdity we refused to entrench. The seats are not advisory; they are voting.",
        "Maintenance was localised. We trained a cohort of solar technicians from within the community, sourced spares from a regional supplier with a maintenance contract, and documented every failure mode we'd seen during the prototype phase in a maintenance playbook the board owns.",
        "Three years on: pumps still run, costs are down 75% versus the diesel baseline, women's leadership representation has held above 50%, and the next two communities in the county are scoping replication using the same governance template.",
      ],
      learnings: [
        "A community-ownership transfer schedule with a date on it is more credible to funders, easier to manage, and structurally fairer to communities than vague \"capacity-building\" framing.",
        "Quotas for women's seats are not a side benefit. They were the difference between a board that knew when the pumps had to run and a board that learned about it from a complaint.",
        "Infrastructure projects are governance projects with hardware attached. We sequence the social architecture before the engineering and the cost curves bend in the right direction.",
      ],
    },
    startDate: "2022-04-01",
    featured: true,
  },
];

export const projectTypes = [
  { value: "all", label: "All Types" },
  { value: "water", label: "Water" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "mental-health", label: "Mental Health" },
  { value: "agriculture", label: "Agriculture" },
  { value: "infrastructure", label: "Infrastructure" },
];

export const projectStatuses = [
  { value: "all", label: "All Status" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "upcoming", label: "Upcoming" },
];
