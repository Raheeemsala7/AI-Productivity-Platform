import type { ChatConversation } from "../types/chat";

const now = Date.now();

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const MOCK_CONVERSATIONS: ChatConversation[] = [
  {
    id: "mock-today-1",
    title: "شرح React Server Components",
    updatedAt: now - 8 * MIN,
    messages: [
      {
        id: "mock-today-1-u",
        role: "user",
        text: "اشرح لي React Server Components بشكل مختصر",
      },
      {
        id: "mock-today-1-a",
        role: "assistant",
        text: "React Server Components (RSC) بتسمح للمكونات تتنفذ على السيرفر وتوصل للعميل HTML جاهز. الميزة الكبرى: تقليل حجم JavaScript وتحميل أسرع للصفحة.\n\n```tsx\n// Server Component — بيشتغل على السيرفر\nasync function Profile() {\n  const user = await getUser();\n  return <p>{user.name}</p>;\n}\n```",
      },
    ],
  },
  {
    id: "mock-today-2",
    title: "مشكلة في API",
    updatedAt: now - 42 * MIN,
    messages: [
      {
        id: "mock-today-2-u",
        role: "user",
        text: "الـAPI بيرجع 401 مع إن الـtoken صح",
      },
      {
        id: "mock-today-2-a",
        role: "assistant",
        text: "غالبًا المشكلة في إرسال الـheader بالشكل السليم. تأكد إنك بتبعت:\n\n```js\nAuthorization: Bearer <token>\n```\n\nولو بستخدام fetch، الإعداد الصح:\n```js\nconst res = await fetch(url, {\n  headers: { Authorization: `Bearer ${token}` },\n});\n```",
      },
    ],
  },
  {
    id: "mock-today-3",
    title: "تحسين أداء الصفحة",
    updatedAt: now - 2 * HOUR,
    messages: [
      {
        id: "mock-today-3-u",
        role: "user",
        text: "الصفحة بطيئة، أعمل إيه؟",
      },
      {
        id: "mock-today-3-a",
        role: "assistant",
        text: "ابدأ بقياس أصل المشكلة:\n1. **Lighthouse** لفحص الأداء.\n2. تقليل حجم الصور وتحويلها لـWebP.\n3. الـlazy loading للمكونات غير الضرورية.\n4. **Server Components** بدل Client مفيش داعي ليه.",
      },
    ],
  },
  {
    id: "mock-yesterday-1",
    title: "تحسين صفحة الـChat",
    updatedAt: now - 26 * HOUR,
    messages: [
      {
        id: "mock-yesterday-1-u",
        role: "user",
        text: "عايز الـchat يكون responsive على الموبايل",
      },
      {
        id: "mock-yesterday-1-a",
        role: "assistant",
        text: "خلّي الـlayout يعتمد على flexbox مع breakpoints موحدة:\n\n- **Desktop**: history sidebar ظاهر جنب الـchat.\n- **Mobile**: full-screen chat + drawer للسجل.\n\nوخلي الكود والجداول `overflow-x-auto` جوه نفسهم عشان ميكسروا العرض.",
      },
    ],
  },
  {
    id: "mock-yesterday-2",
    title: "شرح TypeScript",
    updatedAt: now - 31 * HOUR,
    messages: [
      {
        id: "mock-yesterday-2-u",
        role: "user",
        text: "إيه الفرق بين interface و type؟",
      },
      {
        id: "mock-yesterday-2-a",
        role: "assistant",
        text: "الزيادة فيهم واحدة تقريبًا، بس:\n\n- `interface` تدعم **declaration merging**.\n- `type` بتقدر تعمل منها unions و mapped types.\n\nالقاعدة العملية: استخدم `interface` للـobjects العامة، و`type` لما تحتاج flexibility.",
      },
    ],
  },
  {
    id: "mock-week-1",
    title: "إزاي أستثمر في مشروع SaaS؟",
    updatedAt: now - 3 * DAY,
    messages: [
      {
        id: "mock-week-1-u",
        role: "user",
        text: "عايز أبدأ مشروع SaaS صغير",
      },
      {
        id: "mock-week-1-a",
        role: "assistant",
        text: "ابدأ بـ **problem validation**: شوف مين عنده المشكلة دي وقدر يدفع.\nثم لوّن الـMVP لعميل واحد بس، وقيّس الـusage قبل ما تبيع للتانيين.",
      },
    ],
  },
  {
    id: "mock-week-2",
    title: "Market analysis for coffee shop",
    updatedAt: now - 5 * DAY,
    messages: [
      {
        id: "mock-week-2-u",
        role: "user",
        text: "I want to open an online coffee shop",
      },
      {
        id: "mock-week-2-a",
        role: "assistant",
        text: "Good starting point. Let's pin down the essentials — who is the customer, what do they pay today, and why would they switch?",
      },
    ],
  },
  {
    id: "mock-week-3",
    title: "عمل دراسة جدوى لمطعم",
    updatedAt: now - 6 * DAY,
    messages: [
      {
        id: "mock-week-3-u",
        role: "user",
        text: "دراسة جدوى مطعم برجر ناجحة",
      },
      {
        id: "mock-week-3-a",
        role: "assistant",
        text: "- **التكاليف الثابتة**: إيجار، رواتب، معدات.\n- **التكاليف المتغيرة**: المواد الخام، التغليف.\n- **نقطة التعادل**: عدد الطلبات اللي تغطي التكاليف.\n- **هامش الربح**: استهدف 20%+ بعد السنة الأولى.",
      },
    ],
  },
];