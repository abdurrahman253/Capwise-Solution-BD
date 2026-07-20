import HomeHero from "@/components/home/HomeHero";
import ServiceOverview from "@/components/home/ServiceOverview";
import SiteHeader from "@/components/layout/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <HomeHero />
        <ServiceOverview />
      </main>
    </>
  );
}
