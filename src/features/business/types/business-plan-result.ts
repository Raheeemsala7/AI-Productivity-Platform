export type BusinessPlanSectionId =
  | "idea-evaluation"
  | "business-plan"
  | "marketing-analysis"
  | "sales-strategy"
  | "swot-analysis"
  | "business-model-canvas"
  | "strategic-plan"
  | "risk-assessment"
  | "financial-plan";

export interface IdeaEvaluationMetric {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  description: string;
  badgeText: string;
}

export interface MarketingBudgetItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface SwotQuadrant {
  strengths: { title: string; description: string }[];
  weaknesses: { title: string; description: string }[];
  opportunities: { title: string; description: string }[];
  threats: { title: string; description: string }[];
}

export interface BusinessModelCanvasColumn {
  id: string;
  title: string;
  iconName: string;
  items: string[];
}

export interface RiskItem {
  id: string;
  title: string;
  severity: "low" | "medium" | "high";
  mitigation: string;
}

export interface BusinessPlanResultResponse {
  companyName: string;
  tagline: string;
  industry: string;
  currency: string;
  overallScore: number;
  generatedDate: string;
  ideaEvaluation: {
    overview: string;
    metrics: IdeaEvaluationMetric[];
  };
  executiveSummary: {
    vision: string;
    mission: string;
    overview: string;
    keyHighlights: string[];
  };
  marketingAnalysis: {
    summary: string;
    budgetAllocation: MarketingBudgetItem[];
    recommendedChannels: string[];
  };
  salesStrategy: {
    pricingTiers: { name: string; price: string; description: string }[];
    salesChannels: string[];
    customerRetention: string;
  };
  swotAnalysis: SwotQuadrant;
  businessModelCanvas: {
    columns: BusinessModelCanvasColumn[];
  };
  strategicPlan: {
    phases: { phase: string; title: string; milestones: string[] }[];
  };
  riskAssessment: {
    risks: RiskItem[];
  };
  financialPlan: {
    initialCapital: string;
    monthlyBurn: string;
    breakEvenPeriod: string;
    annualProjections: { year: string; revenue: string; profit: string }[];
  };
}

