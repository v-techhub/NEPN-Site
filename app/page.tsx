import CTABanner from "@/core/components/call-to-action";
import CompanyOverview from "@/core/components/company-overview";
import FeaturesBar from "@/core/components/features";
import HeroCarousel from "@/core/components/hero";
import Partnerships from "@/core/components/partnerships";
import ShowcaseGrid from "@/core/components/showcase-grid";
import WhatWeDo from "@/core/components/what-we-do";

export default function Home() {
  return (
    <div className="">
      <HeroCarousel />
      <FeaturesBar />
      <CompanyOverview />
      <WhatWeDo />
      <ShowcaseGrid />
      <CTABanner />
      <Partnerships />
    </div>
  );
}
