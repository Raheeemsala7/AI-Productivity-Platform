import { BusinessPlanResultResponse } from "../types/business-plan-result";

export function getMockBusinessPlanResult(customData?: {
  businessName?: string;
  valueProp?: string;
  businessDesc?: string;
  currency?: string;
  budget?: string;
  monthlyCosts?: string;
}): BusinessPlanResultResponse {
  const name = customData?.businessName || "Learnify";
  const currency = customData?.currency || "USD";
  const currSymbol = currency === "SAR" ? "SAR " : currency === "EGP" ? "EGP " : "$";

  return {
    companyName: name,
    tagline:
      customData?.valueProp ||
      "Innovative AI-driven enterprise tools and workflow optimization.",
    industry: "Enterprise AI & Productivity SaaS",
    currency: currency,
    overallScore: 8.6,
    generatedDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),

    // 1. Idea Evaluation (Matching Image 1)
    ideaEvaluation: {
      overview: `${name} demonstrates high viability and strategic defensibility with strong market pull in B2B enterprise automation.`,
      metrics: [
        {
          id: "business-idea",
          title: "Business Idea",
          score: 8,
          maxScore: 10,
          description: `${name} stands as a cutting-edge software development company that leverages AI to create specialized tools for enterprises. Its core focus is on delivering innovative solutions that cater to the distinct needs of businesses across various sectors, providing a competitive edge in the technological arena.`,
          badgeText: "High Viability",
        },
        {
          id: "problem-statement",
          title: "Problem Statement",
          score: 7,
          maxScore: 10,
          description: `Many enterprises struggle with integrating AI solutions into their operations effectively, resulting in inefficiencies and missed opportunities. ${name} aims to address this gap by providing tailored AI-driven tools that enhance operational efficiency and drive innovation.`,
          badgeText: "Validated Pain",
        },
        {
          id: "market-opportunity",
          title: "Market Opportunity",
          score: 8,
          maxScore: 10,
          description: `The demand for AI solutions in enterprise software is growing rapidly, driven by the need for innovation and efficiency. ${name} can capitalize on this trend by targeting businesses seeking AI integration, particularly those in the medium to enterprise segments that want cost-effective, dependable solutions.`,
          badgeText: "Expanding TAM",
        },
      ],
    },

    // 2. Executive Summary / Business Plan
    executiveSummary: {
      vision: `To become the leading AI operating system empowering modern enterprises across the region to achieve 10x operational speed.`,
      mission: `Delivering accessible, highly reliable artificial intelligence tools that simplify complex business workflows and unlock exponential growth.`,
      overview: `${name} bridges the gap between emerging AI models and everyday enterprise software by providing modular, security-first business productivity suites.`,
      keyHighlights: [
        "Proprietary AI workflow orchestration engine tailored for enterprise accuracy.",
        "Rapid 5-minute onboarding with no specialized machine learning staff required.",
        "Expected break-even within 10 months based on conservative SaaS adoption.",
        "High gross margin profile (82%) typical of cloud software architectures.",
      ],
    },

    // 3. Marketing Analysis (Matching Image 2 - Pie Chart)
    marketingAnalysis: {
      summary: `${name}'s marketing budget allocation prioritizes high-impact channels to maximize return on investment. By focusing resources on digital marketing and strategic partnerships, we aim to achieve substantial brand growth within budget constraints.`,
      budgetAllocation: [
        { name: "Digital Marketing", value: 4000, percentage: 40, color: "#f43f5e" }, // Pink
        { name: "Content Marketing", value: 2000, percentage: 20, color: "#38bdf8" }, // Blue
        { name: "Events & Webinars", value: 1500, percentage: 15, color: "#f59e0b" }, // Yellow
        { name: "Partnerships", value: 1500, percentage: 15, color: "#2dd4bf" }, // Cyan
        { name: "Traditional Media", value: 1000, percentage: 10, color: "#8b5cf6" }, // Purple
      ],
      recommendedChannels: [
        "LinkedIn Thought Leadership & B2B Sponsored Content",
        "Search Intent Advertising (Google Ads for enterprise AI queries)",
        "Technology Co-selling Partnerships with Cloud Providers",
        "Quarterly Executive AI Roundtables & Industry Conferences",
      ],
    },

    // 4. Sales Strategy
    salesStrategy: {
      pricingTiers: [
        {
          name: "Starter Team",
          price: `${currSymbol}49 / mo`,
          description: "Essential workflow automation for small teams up to 10 users.",
        },
        {
          name: "Professional Growth",
          price: `${currSymbol}199 / mo`,
          description: "Advanced AI models, custom integrations, and priority SLA support.",
        },
        {
          name: "Enterprise Custom",
          price: `${currSymbol}899+ / mo`,
          description: "Dedicated private tenant, SOC2 compliance, and dedicated success manager.",
        },
      ],
      salesChannels: [
        "Product-Led Growth (Self-serve 14-day free trial on web platform)",
        "Inbound Demo Scheduling via High-Converting Landing Pages",
        "Direct Enterprise Outbound to CTOs and Operations Executives",
      ],
      customerRetention:
        "Quarterly business reviews, proactive customer success automation, and continuous feature delivery.",
    },

    // 5. SWOT Analysis (Matching Image 3)
    swotAnalysis: {
      strengths: [
        {
          title: "Cutting-Edge AI Tech Moat",
          description: "Proprietary prompt chains and fine-tuned models delivering 99% task accuracy.",
        },
        {
          title: "Exceptional Time-to-Value",
          description: "Intuitive UX that requires zero engineering expertise to deploy across departments.",
        },
        {
          title: "Lean Cost Structure",
          description: "Serverless inference architecture minimizing server idle overhead.",
        },
      ],
      weaknesses: [
        {
          title: "Early Brand Awareness",
          description: "New market entrant requiring focused educational and trust-building marketing.",
        },
        {
          title: "Third-party Model Dependency",
          description: "Reliance on foundational model APIs requiring multi-provider fallback strategies.",
        },
        {
          title: "Sales Cycle Length",
          description: "Enterprise procurement cycles typically average 45 to 60 days.",
        },
      ],
      opportunities: [
        {
          title: "Rapid Regional AI Adoption",
          description: "Government and private sectors in GCC/MENA aggressively subsidizing AI digital transformation.",
        },
        {
          title: "API Platform Expansion",
          description: "Offering our proprietary workflow engines as white-label APIs for larger IT consultancies.",
        },
        {
          title: "Verticalized Industry Editions",
          description: "Creating tailored editions for legal, healthcare, real estate, and financial services.",
        },
      ],
      threats: [
        {
          title: "Global Big-Tech Entrants",
          description: "Large incumbents (Microsoft, Google) expanding native enterprise co-pilots.",
        },
        {
          title: "API Pricing Fluctuations",
          description: "Shifts in foundational inference compute pricing impacting gross margins.",
        },
        {
          title: "Data Sovereignty Regulations",
          description: "Strict localized data residency requirements requiring in-country cloud hosting.",
        },
      ],
    },

    // 6. Business Model Canvas (Matching Image 4)
    businessModelCanvas: {
      columns: [
        {
          id: "partners",
          title: "Key Partners",
          iconName: "Handshake",
          items: [
            "Technology partners (Cloud & LLM providers)",
            "Enterprise clients (Design partners)",
            "Consulting firms & System integrators",
            "Academic & AI research institutions",
          ],
        },
        {
          id: "activities",
          title: "Key Activities",
          iconName: "Activity",
          items: [
            "AI software development & continuous deployment",
            "Customer support & onboarding engineering",
            "Market research & benchmarking",
            "Data security & compliance audits",
          ],
        },
        {
          id: "value",
          title: "Value Proposition",
          iconName: "Sparkles",
          items: [
            "Innovative AI solutions for enterprise automation",
            "Customized tools saving 40% operating hours",
            "Scalable & secure cloud deployment",
            "Dedicated Arabic & multilingual support",
          ],
        },
        {
          id: "relationships",
          title: "Customer Relationships",
          iconName: "HeartHandshake",
          items: [
            "Personalized enterprise support",
            "Feedback-driven rapid improvements",
            "Long-term SLA partnerships",
            "Regular community webinars & training",
          ],
        },
        {
          id: "channels",
          title: "Channels",
          iconName: "Share2",
          items: [
            "Direct enterprise sales team",
            "Self-serve online web platform",
            "Partner networks & IT resellers",
            "Industry events & webinars",
          ],
        },
      ],
    },

    // 7. Strategic Plan
    strategicPlan: {
      phases: [
        {
          phase: "Phase 1 (Months 1 - 3)",
          title: "Product Hardening & Alpha Launch",
          milestones: [
            "Finalize MVP with 10 design partner enterprises.",
            "Establish automated billing & usage analytics.",
            "Complete SOC2 compliance preliminary audit.",
          ],
        },
        {
          phase: "Phase 2 (Months 4 - 8)",
          title: "Commercial Expansion & Channel Scaling",
          milestones: [
            "Launch public self-serve platform.",
            "Onboard 250 paying businesses.",
            "Hire 2 dedicated enterprise account executives.",
          ],
        },
        {
          phase: "Phase 3 (Months 9 - 12)",
          title: "Market Leadership & Regional Scale",
          milestones: [
            "Reach $50,000 Monthly Recurring Revenue (MRR).",
            "Expand local cloud hosting in Saudi Arabia & UAE.",
            "Prepare Series A institutional fundraising round.",
          ],
        },
      ],
    },

    // 8. Risk Assessment
    riskAssessment: {
      risks: [
        {
          id: "r1",
          title: "Model hallucination in mission-critical workflows",
          severity: "medium",
          mitigation:
            "Implemented dual-pass verification and human-in-the-loop review triggers for high-stakes operations.",
        },
        {
          id: "r2",
          title: "Cloud provider outage",
          severity: "low",
          mitigation:
            "Multi-region failover across AWS and Azure infrastructure with automated DNS routing.",
        },
        {
          id: "r3",
          title: "Customer churn during economic slowdowns",
          severity: "medium",
          mitigation:
            "Positioning product directly around cost reduction and operational headcount savings.",
        },
      ],
    },

    // 9. Financial Plan
    financialPlan: {
      initialCapital: `${currSymbol}${customData?.budget || "35,000"}`,
      monthlyBurn: `${currSymbol}${customData?.monthlyCosts || "4,500"}`,
      breakEvenPeriod: "10 Months",
      annualProjections: [
        {
          year: "Year 1",
          revenue: `${currSymbol}180,000`,
          profit: `${currSymbol}24,000`,
        },
        {
          year: "Year 2",
          revenue: `${currSymbol}620,000`,
          profit: `${currSymbol}195,000`,
        },
        {
          year: "Year 3",
          revenue: `${currSymbol}1,850,000`,
          profit: `${currSymbol}740,000`,
        },
      ],
    },
  };
}

