export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  metricHighlight?: {
    label: string;
    value: string;
  };
  layout: "split" | "centered" | "grid" | "stats";
}

export interface GeneratedDeck {
  id: string;
  title: string;
  prompt: string;
  theme: "obsidian" | "corporate" | "emerald" | "sunset";
  language: "ar" | "en";
  slidesCount: number;
  slides: SlideItem[];
  createdAt: string;
}

export interface RecentDeckItem {
  id: string;
  title: string;
  date: string;
  slidesCount: number;
  theme: "obsidian" | "corporate" | "emerald" | "sunset";
  color: string;
}

