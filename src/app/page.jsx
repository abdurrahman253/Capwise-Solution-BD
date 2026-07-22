import BangladeshPreview from "@/components/home/BangladeshPreview";
import HomeHero from "@/components/home/HomeHero";
import ServiceOverview from "@/components/home/ServiceOverview";
import TrustStrip from "@/components/home/TrustStrip";
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
        <BangladeshPreview />
      </main>
    </>
  );
}
