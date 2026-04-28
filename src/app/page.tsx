import Hero from "@/components/sections/Hero";
import SiloTrap from "@/components/sections/SiloTrap";
import AppliedIntersectionality from "@/components/sections/AppliedIntersectionality";
import ThreePillars from "@/components/sections/ThreePillars";
import ThreeEngines from "@/components/sections/ThreeEngines";
import HomeFeaturedProjects from "@/components/sections/HomeFeaturedProjects";
import WhoItsFor from "@/components/sections/WhoItsFor";
import InsightsTeaser from "@/components/sections/InsightsTeaser";
import HomeContact from "@/components/sections/HomeContact";

export default function Home() {
  return (
    <>
      <Hero />
      <SiloTrap />
      <AppliedIntersectionality />
      <ThreePillars />
      <ThreeEngines />
      <HomeFeaturedProjects />
      <WhoItsFor />
      <InsightsTeaser />
      <HomeContact />
    </>
  );
}
