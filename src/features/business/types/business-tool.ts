export type BusinessCategory = "all" | "planning" | "pitch" | "growth";

export type BusinessToolId =
  | "business-plan"
  | "generate-presentation"
  | "generate-landing"
  | "business-proposal"
  | "business-reports";

export interface BusinessToolItem {
  id: BusinessToolId;
  slug: string;
  category: "planning" | "pitch" | "growth";
  translationKey: "businessPlan" | "generatePresentation" | "generateLanding" | "businessProposal" | "businessReports";
  graphicType: BusinessToolId;
  href: string;
  modelEngine: string;
  accentColor: string;
  gradient: string;
  badgeTone: string;
  estimatedCredits: number;
}

