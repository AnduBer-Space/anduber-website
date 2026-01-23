import { Metadata } from "next";
import JoinHero from "./components/JoinHero";
import ContributionCards from "./components/ContributionCards";
import JoinFooterQuote from "./components/JoinFooterQuote";

export const metadata: Metadata = {
  title: "Join the Movement | AnduBer",
  description: "The challenges of our time need all of us. Discover how you can contribute to AnduBer through careers, consulting, volunteering, ideas, and more.",
  openGraph: {
    title: "Join the Movement | AnduBer",
    description: "The challenges of our time need all of us. Discover how you can contribute to AnduBer.",
    type: "website",
  },
};

export default function JoinPage() {
  return (
    <>
      <JoinHero />
      <ContributionCards />
      <JoinFooterQuote />
    </>
  );
}
