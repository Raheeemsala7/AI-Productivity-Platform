import { CoreFeatures } from "@/shared/components/core-features";
import { DemoSection } from "@/shared/components/demo-section";
import { FAQ } from "@/shared/components/faq";
import { Footer } from "@/shared/components/footer";
import { Hero } from "@/shared/components/hero";
import { Pricing } from "@/shared/components/pricing";
import { WhyOrico } from "@/shared/components/why-sec";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyOrico />
      <CoreFeatures />
      <DemoSection />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
