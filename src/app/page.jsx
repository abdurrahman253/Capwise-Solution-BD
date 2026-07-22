import BangladeshPreview from "@/components/home/BangladeshPreview";
import ClientEvidencePreview from "@/components/home/ClientEvidencePreview";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import FaqPreview from "@/components/home/FaqPreview";
import HomeHero from "@/components/home/HomeHero";
import IndustriesOverview from "@/components/home/IndustriesOverview";
import ResourcesPreview from "@/components/home/ResourcesPreview";
import ServiceOverview from "@/components/home/ServiceOverview";
import TrustStrip from "@/components/home/TrustStrip";
import TeamPreview from "@/components/home/TeamPreview";
import WhyCapwise from "@/components/home/WhyCapwise";
import SiteHeader from "@/components/layout/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <HomeHero />
        <TrustStrip />
        <ServiceOverview />
        <WhyCapwise />
        <IndustriesOverview />
        <BangladeshPreview />
        <TeamPreview />
        <ResourcesPreview />
        <ClientEvidencePreview />
        <FaqPreview />
        <ConsultationCTA />
      </main>
    </>
  );
}
