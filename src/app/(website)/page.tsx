import { CoreFeatures } from "@/shared/components/core-features";
import { DemoSection } from "@/shared/components/demo-section";
import { FAQ } from "@/shared/components/faq";
import { Hero } from "@/shared/components/hero";
import { Pricing } from "@/shared/components/pricing";
import { WhyOrico } from "@/shared/components/why-sec";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyOrico />
      <CoreFeatures />
      <DemoSection />
      <Pricing />
      <FAQ />
    </>
  );
}
