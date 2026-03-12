import CTABanner from "@/core/components/call-to-action";
import FAQ from "@/core/components/faq";
import CompanyOverview from "@/core/components/company-overview";
import FeaturesBar from "@/core/components/features";
import HeroCarousel from "@/core/components/hero";
import MiniCTA from "@/core/components/mini-call-to-action";
import LatestNews from "@/core/components/news";
import Partnerships from "@/core/components/partnerships";
import ShowcaseGrid from "@/core/components/showcase-grid";
import Testimonials from "@/core/components/testimonial";
import WhatWeDo from "@/core/components/what-we-do";

export default function Home() {
  return (
    <div className="max-w-dvw overflow-x-clip">
      <HeroCarousel />
      <FeaturesBar />
      <CompanyOverview />
      <WhatWeDo />
      <ShowcaseGrid />
      <CTABanner />
      <Partnerships />
      <Testimonials />
      <FAQ />
      <LatestNews />
      <MiniCTA />
    </div>
  );
}
