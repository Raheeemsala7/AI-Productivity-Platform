import { Plan } from "@/features/admin/plans/types/plan";
import { RevealInit } from "./reveal-init";
import { HeroSection } from "./hero-section";
import { ProductSection } from "./product-section";
import { ToolsSection } from "./tools-section";
import { TemplatesSection } from "./templates-section";
import { WorkspaceSection } from "./workspace-section";
import { RhythmSection } from "./rhythm-section";
import { PricingSection } from "./pricing-section";
import { CtaSection } from "./cta-section";

interface LandingPageProps {
  plans?: Plan[];
}

export function LandingPage({ plans = [] }: LandingPageProps) {
  return (
    <div className="overflow-clip bg-background text-foreground">
      <RevealInit />
      <main>
        <HeroSection />
        <ProductSection />
        <ToolsSection />
        <TemplatesSection />
        <WorkspaceSection />
        <RhythmSection />
        <PricingSection plans={plans} />
        <CtaSection />
      </main>
    </div>
  );
}
