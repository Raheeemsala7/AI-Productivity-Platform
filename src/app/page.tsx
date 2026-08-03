import { CoreFeatures } from "@/shared/components/core-features";
import { DemoSection } from "@/shared/components/demo-section";
import { Hero } from "@/shared/components/hero";
import { WhyOrico } from "@/shared/components/why-sec";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyOrico />
      <CoreFeatures />
      <DemoSection />
    </>
  );
}
