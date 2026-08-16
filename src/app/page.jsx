import SiteHeader from "@/components/layout/SiteHeader";
import HomeHero from "@/components/home/HomeHero";
import TrustStrip from "@/components/home/TrustStrip";
import FirmIntro from "@/components/home/FirmIntro";
import ServiceOverview from "@/components/home/ServiceOverview";
import PickYourIndustry from "@/components/home/PickYourIndustry";
import InsightsPreview from "@/components/home/InsightsPreview";
import TeamPreview from "@/components/home/TeamPreview";
import WhyCapwise from "@/components/home/WhyCapwise";
import ConsultationCTA from "@/components/home/ConsultationCTA";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HomeHero />
        <TrustStrip />
        <FirmIntro />
        <ServiceOverview />
        <PickYourIndustry />
        <InsightsPreview />
        <TeamPreview />
        <WhyCapwise />
        <ConsultationCTA />
      </main>
    </>
  );
}
