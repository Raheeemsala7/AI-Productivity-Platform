import {
  RecentCreationItem,
  GeneratedDeck,
  SlideItem,
  GeneratedLandingPage,
  LandingPageSection,
} from "../types/presentation";
import { PresentationFormValues } from "../schema/presentation.schema";

export const RECENT_CREATIONS_MOCK: RecentCreationItem[] = [
  {
    id: "deck-1",
    title: "مستقبل السيارات الكهربائية الذكية",
    type: "presentation",
    date: "منذ أسبوع",
    count: 8,
    slidesCount: 8,
    theme: "corporate",
    color: "#8b5cf6", // Purple/Violet
  },
  {
    id: "landing-1",
    title: "صفحة هبوط منصة تداول استثمارية ذكية",
    type: "landing",
    date: "منذ 3 أيام",
    count: 5,
    slidesCount: 5,
    theme: "obsidian",
    color: "#0ea5e9", // Sky/Blue
  },
  {
    id: "deck-2",
    title: "اتجاهات التسويق الرقمي 2026",
    type: "presentation",
    date: "منذ شهر",
    count: 12,
    slidesCount: 12,
    theme: "emerald",
    color: "#10b981", // Green
  },
  {
    id: "landing-2",
    title: "إطلاق تطبيق الصحة واللياقة البدنية ProFit",
    type: "landing",
    date: "منذ ساعتين",
    count: 6,
    slidesCount: 6,
    theme: "sunset",
    color: "#f59e0b", // Amber
  },
  {
    id: "deck-3",
    title: "أهداف الفريق ومؤشرات الأداء Q3",
    type: "presentation",
    date: "منذ أسبوعين",
    count: 6,
    slidesCount: 6,
    theme: "obsidian",
    color: "#38bdf8", // Sky
  },
];

// Alias for backwards compatibility
export const RECENT_DECKS_MOCK = RECENT_CREATIONS_MOCK;

export function createMockGeneratedDeck(
  values: PresentationFormValues
): GeneratedDeck {
  const isAr = values.language === "ar";
  const title =
    values.prompt.length > 45
      ? values.prompt.slice(0, 45) + "..."
      : values.prompt || (isAr ? "عرض تقديمي استراتيجي" : "Strategic Presentation");

  const count = values.slidesCount || 8;

  const slides: SlideItem[] = Array.from({ length: count }).map((_, idx) => {
    const slideNumber = idx + 1;

    if (slideNumber === 1) {
      return {
        id: 1,
        title: title,
        subtitle: isAr
          ? "رؤية استراتيجية ونموذج عمل شامل مدعوم بالذكاء الاصطناعي"
          : "Strategic AI-Powered Vision & Comprehensive Roadmap",
        bulletPoints: [
          isAr
            ? "تحليل شامل لفرص السوق ونقاط القوة التنافسية"
            : "Holistic market opportunity & strategic moat analysis",
          isAr
            ? "خطة العمليات ومراحل النمو السريع للأشهر القادمة"
            : "Operational roadmap & hyper-growth scale trajectory",
          isAr
            ? "المؤشرات المالية وتوقعات العائد على الاستثمار"
            : "Financial projection & proven unit economics",
        ],
        layout: "centered",
      };
    }

    if (slideNumber === 2) {
      return {
        id: 2,
        title: isAr ? "المشكلة والفجوة السوقية الحالية" : "Market Gap & Problem Statement",
        subtitle: isAr
          ? "تحديات حقيقية تواجه الشركات وتتطلب حلولاً جذرية مبتكرة"
          : "Critical bottlenecks demanding next-generation solutions",
        bulletPoints: [
          isAr
            ? "أكثر من 72% من الشركات تعاني من بطء في أتمتة العمليات اليومية"
            : "Over 72% of enterprises struggle with fragmented workflow automation",
          isAr
            ? "تكاليف تشغيلية متزايدة دون تحقيق كفاءة إنتاجية متناسبة"
            : "Escalating operational overhead without proportional productivity gains",
          isAr
            ? "صعوبة الحصول على رؤى واستنتاجات فورية من البيانات الضخمة"
            : "Difficulty extracting immediate actionable insights from unstructured data",
        ],
        metricHighlight: {
          label: isAr ? "فقدان كفاءة سنوياً" : "Lost Efficiency / Year",
          value: "$420B",
        },
        layout: "split",
      };
    }

    if (slideNumber === 3) {
      return {
        id: 3,
        title: isAr ? "الحل المقترح والقيمة المضافة" : "The Solution & Value Proposition",
        subtitle: isAr
          ? "منصة متكاملة مدعومة بالذكاء الاصطناعي لتسريع النتائج"
          : "An integrated AI engine built for enterprise velocity",
        bulletPoints: [
          isAr
            ? "توليد محتوى واستراتيجيات عمل بدقة فائقة وبضغطة زر واحدة"
            : "Autonomous content generation with verified business logic",
          isAr
            ? "تكامل سلس مع جميع الأنظمة السحابية وأدوات الفريق القائمة"
            : "Seamless native integration with existing cloud ecosystem",
          isAr
            ? "حماية وأمان معزز للبيانات يتوافق مع المعايير العالمية"
            : "Enterprise-grade data sovereignty and zero-data-retention security",
        ],
        layout: "grid",
      };
    }

    return {
      id: slideNumber,
      title: isAr ? `المحور الاستراتيجي ${slideNumber}: خطة التنفيذ` : `Strategic Pillar ${slideNumber}: Execution Plan`,
      subtitle: isAr
        ? "مؤشرات الإنجاز والجداول الزمنية لتحقيق الأهداف المقررة"
        : "Milestones, KPI metrics, and operational readiness",
      bulletPoints: [
        isAr ? "إطلاق النسخة التجريبية واختبار ردود أفعال المستخدمين الأوائل" : "Alpha launch with selected high-velocity pilot customers",
        isAr ? "تحسين مستمر لنسب التحويل وتخفيض تكلفة اكتساب العملاء" : "Continuous CAC reduction & conversion optimization",
        isAr ? "التوسع الإقليمي واستهداف الأسواق سريعة النمو" : "Regional scale-out targeting tier-1 growth markets",
      ],
      metricHighlight: {
        label: isAr ? "نسبة النمو المتوقعة" : "Expected Growth Rate",
        value: `${slideNumber * 25}%`,
      },
      layout: slideNumber % 2 === 0 ? "split" : "stats",
    };
  });

  return {
    id: `deck-${Date.now()}`,
    title,
    prompt: values.prompt,
    theme: values.theme,
    language: values.language,
    slidesCount: count,
    slides,
    createdAt: new Date().toISOString(),
  };
}

export function createMockGeneratedLandingPage(
  values: PresentationFormValues
): GeneratedLandingPage {
  const isAr = values.language === "ar";
  const title =
    values.prompt.length > 50
      ? values.prompt.slice(0, 50) + "..."
      : values.prompt || (isAr ? "منصة الجيل القادم للذكاء الاصطناعي" : "Next-Gen AI Platform");

  const sectionsCount = values.sectionsCount || 5;

  const sections: LandingPageSection[] = [
    {
      id: "hero",
      type: "hero",
      title: title,
      subtitle: isAr
        ? "حوّل أفكارك المعقدة إلى صفحات هبوط ومنتجات استثنائية تحقق أعلى معدلات تحويل في ثوانٍ معدودة."
        : "Transform ambitious ideas into high-converting landing pages and pitch assets in seconds with generative AI.",
      content: isAr
        ? "انضم إلى أكثر من 25,000 رائد أعمال وقائد فريق يثقون في منصتنا."
        : "Join over 25,000 founders and growth teams scaling with AI.",
      items: [
        {
          title: isAr ? "ابدأ مجاناً اليوم" : "Start Free Today",
          description: isAr ? "بدون بطاقة ائتمان" : "No credit card required",
          badge: isAr ? "تجربة مجانية" : "Free Trial",
        },
      ],
    },
    {
      id: "stats",
      type: "stats",
      title: isAr ? "أرقام تتحدث عن نفسها" : "Proven by Numbers",
      items: [
        {
          title: "99.4%",
          description: isAr ? "دقة الصياغة والمخرجات" : "Output Accuracy",
          badge: isAr ? "جودة فائقة" : "Top Quality",
        },
        {
          title: "14x",
          description: isAr ? "سرعة مضاعفة في الإطلاق" : "Faster Time to Market",
          badge: isAr ? "كفاءة قياسية" : "Velocity",
        },
        {
          title: "+40K",
          description: isAr ? "صفحة تم إنشاؤها بنجاح" : "Pages Built",
          badge: isAr ? "ثقة مجتمعية" : "Community",
        },
        {
          title: "4.9/5",
          description: isAr ? "تقييم العملاء والشركات" : "User Rating",
          badge: isAr ? "أعلى تقييم" : "Best Rated",
        },
      ],
    },
    {
      id: "features",
      type: "features",
      title: isAr ? "ميزات مصممة خصيصاً للنمو السريع" : "Features Engineered for Conversion",
      subtitle: isAr
        ? "كل ما تحتاجه لإقناع جمهورك وتحويل الزوار إلى عملاء مخلصين"
        : "Everything you need to turn visitors into passionate customers",
      items: [
        {
          title: isAr ? "تصميم ذكي متجاوب 100%" : "Fully Responsive Layouts",
          description: isAr
            ? "تتكيف صفحتك تلقائياً وبشكل مبهر مع الشاشات المحمولة والأجهزة اللوحية والمكتبية."
            : "Pixel-perfect rendering optimized across mobile, tablet, and desktop viewports.",
          badge: isAr ? "تصميم متجاوب" : "Responsive",
        },
        {
          title: isAr ? "نصوص بيع مقنعة (Copywriting)" : "Persuasive Conversion Copy",
          description: isAr
            ? "صياغة احترافية مبنية على سيكولوجيا الشراء لتحفيز الزائر على اتخاذ إجراء فوري."
            : "Psychology-backed copywriting tuned to drive immediate user action and signups.",
          badge: isAr ? "صياغة بيعية" : "High CRO",
        },
        {
          title: isAr ? "تصدير فوري للكود (React & HTML)" : "One-Click Code Export",
          description: isAr
            ? "احصل على الكود النظيف مع Tailwind CSS جاهز للنشر على Vercel أو موقعك الخاص."
            : "Clean React + Tailwind CSS code ready for instant production deployment.",
          badge: isAr ? "تصدير كود" : "Clean Code",
        },
        {
          title: isAr ? "تحسين محركات البحث الفوري (SEO)" : "Built-in Search Optimization",
          description: isAr
            ? "عناوين وسوم Meta وبنية صفحات معيارية تمنحك الصدارة في نتائج محركات البحث."
            : "Automated semantic markup, meta tags, and OpenGraph schemas built for ranking.",
          badge: "SEO Ready",
        },
      ],
    },
    {
      id: "testimonials",
      type: "testimonials",
      title: isAr ? "ماذا يقول عملاؤنا" : "What Founders Are Saying",
      subtitle: isAr ? "قصص نجاح من شركات ناشئة وفرق عمل" : "Success stories from modern teams",
      items: [
        {
          title: isAr ? "سارة الزهراني — مديرة منتج في FinTech" : "Sarah Al-Zahrani — Product Lead",
          description: isAr
            ? "أنشأنا صفحة هبوط لإطلاق ميزة جديدة في 5 دقائق، وارتفعت نسبة التسجيل الأولي بنسبة 45%!"
            : "We launched our feature landing page in under 5 minutes and saw an immediate 45% boost in pre-orders.",
          badge: "⭐️⭐️⭐️⭐️⭐️",
        },
        {
          title: isAr ? "خالد العتيبي — مؤسس منصة لوجستية" : "Khaled Al-Otaibi — Logistics Founder",
          description: isAr
            ? "التكامل بين العرض التقديمي وصفحة الهبوط في مكان واحد وفّر علينا أسابيع من عمل وكالات التصميم."
            : "Having both pitch deck and landing page generated together saved our team weeks of agency friction.",
          badge: "⭐️⭐️⭐️⭐️⭐️",
        },
      ],
    },
    {
      id: "cta",
      type: "cta",
      title: isAr ? "جاهز لإطلاق فكرتك القادمة؟" : "Ready to Launch Your Next Vision?",
      subtitle: isAr
        ? "ابدأ بتوليد صفحة الهبوط الخاصة بك الآن واجذب أول 1,000 عميل."
        : "Deploy your landing page right now and acquire your first 1,000 customers.",
      items: [
        {
          title: isAr ? "ابدأ الآن مجاناً" : "Get Started Now",
          description: isAr ? "بدون أي رسوم خفية" : "Zero friction, no credit card",
        },
      ],
    },
  ];

  return {
    id: `landing-${Date.now()}`,
    title,
    tagline: isAr ? "صفحة هبوط احترافية عالية التحويل" : "High-Converting AI Landing Page",
    prompt: values.prompt,
    theme: values.theme,
    language: values.language,
    sectionsCount: sections.slice(0, sectionsCount).length,
    heroCta: isAr ? "ابدأ مجاناً اليوم" : "Get Started Now",
    sections: sections.slice(0, sectionsCount),
    createdAt: new Date().toISOString(),
  };
}
