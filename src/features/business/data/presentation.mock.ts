import { RecentDeckItem, GeneratedDeck, SlideItem } from "../types/presentation";
import { PresentationFormValues } from "../schema/presentation.schema";

export const RECENT_DECKS_MOCK: RecentDeckItem[] = [
  {
    id: "deck-1",
    title: "مستقبل السيارات الكهربائية",
    date: "منذ 4 أشهر",
    slidesCount: 8,
    theme: "corporate",
    color: "#8b5cf6", // Purple/Violet
  },
  {
    id: "deck-2",
    title: "اتجاهات التسويق 2026",
    date: "منذ 4 أشهر",
    slidesCount: 12,
    theme: "emerald",
    color: "#10b981", // Green
  },
  {
    id: "deck-3",
    title: "أهداف الفريق ومؤشرات الأداء",
    date: "منذ 4 أشهر",
    slidesCount: 6,
    theme: "obsidian",
    color: "#38bdf8", // Blue
  },
  {
    id: "deck-4",
    title: "استكشاف المجموعة الشمسية",
    date: "منذ 4 أشهر",
    slidesCount: 10,
    theme: "sunset",
    color: "#f59e0b", // Yellow/Amber
  },
];

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
            ? "عرض تقديمي مخصص وموجه للمستثمرين وصناع القرار"
            : "Tailored executive presentation for decision makers",
          isAr
            ? "تحليل شامل لفرص النمو والتوسع السوقي"
            : "In-depth market expansion & opportunity analysis",
        ],
        metricHighlight: {
          label: isAr ? "معدل النمو السنوي" : "Projected CAGR",
          value: "+135%",
        },
        layout: "centered",
      };
    }

    if (slideNumber === 2) {
      return {
        id: 2,
        title: isAr ? "المشكلة والفجوة السوقية الحالية" : "Market Problem & Opportunity Gap",
        subtitle: isAr
          ? "التحديات التي تواجه الشركات اليوم وغياب الحلول الفعالة"
          : "Key operational inefficiencies and unmet customer needs",
        bulletPoints: [
          isAr
            ? "ارتفاع تكاليف الإجراءات اليدوية بنسبة 45% سنوياً"
            : "45% annual overhead on fragmented manual workflows",
          isAr
            ? "صعوبة التنسيق ومحدودية قابلية التوسع"
            : "Severe scalability constraints across business operations",
          isAr
            ? "غياب الحلول المخصصة للأسواق الإقليمية واللغة العربية"
            : "Lack of localized regional AI automation architectures",
        ],
        metricHighlight: {
          label: isAr ? "حجم الهدر التشغيلي" : "Operational Waste",
          value: "$4.2B",
        },
        layout: "split",
      };
    }

    if (slideNumber === 3) {
      return {
        id: 3,
        title: isAr ? "الحل المقترح والقيمة التنافسية" : "The Core Solution & Strategic Moat",
        subtitle: isAr
          ? "كيف نعيد تعريف كفاءة الأعمال بنظام متكامل وذكي"
          : "Redefining enterprise productivity with autonomous AI",
        bulletPoints: [
          isAr
            ? "أتمتة ذكية فورية تخفض زمن التنفيذ بنسبة 70%"
            : "Instant AI orchestration reducing processing time by 70%",
          isAr
            ? "تجربة مستخدم استثنائية دون الحاجة لتدريب تقني معقد"
            : "Frictionless consumer-grade UX requiring zero onboarding",
          isAr
            ? "توافق وأمان مؤسسي كامل مع معايير حماية البيانات"
            : "Enterprise-grade security and local data compliance",
        ],
        layout: "grid",
      };
    }

    return {
      id: slideNumber,
      title: isAr
        ? `المحور الاستراتيجي #${slideNumber}: التوسع والاستدامة`
        : `Strategic Pillar #${slideNumber}: Execution & Scale`,
      subtitle: isAr
        ? "مستهدفات الأداء وخارطة طريق التنفيذ العملي"
        : "Operational milestones and key performance indicators",
      bulletPoints: [
        isAr
          ? "بناء الشراكات الاستراتيجية مع كبرى المؤسسات"
          : "Establishing strategic enterprise partnerships",
        isAr
          ? "تحقيق نقطة التعادل المالي والتدفق النقدي الإيجابي"
          : "Reaching break-even profitability and net-positive cashflow",
        isAr
          ? "توسيع باقة الخدمات والمنتجات المدعومة بنماذج الجيل القادم"
          : "Expanding next-generation product capabilities",
      ],
      metricHighlight: {
        label: isAr ? "مؤشر الكفاءة" : "Efficiency Gain",
        value: "10x",
      },
      layout: "split",
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
    createdAt: isAr ? "الآن" : "Just now",
  };
}

