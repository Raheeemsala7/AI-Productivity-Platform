export type CreationMode =
  | "general"
  | "presentation"
  | "landing"
  | "document"
  | "carousel";

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

export interface LandingPageSection {
  id: string;
  type: "hero" | "stats" | "features" | "testimonials" | "pricing" | "cta";
  title: string;
  subtitle?: string;
  content?: string;
  items?: {
    title: string;
    description: string;
    badge?: string;
  }[];
}

export interface GeneratedLandingPage {
  id: string;
  title: string;
  tagline: string;
  prompt: string;
  theme: "obsidian" | "corporate" | "emerald" | "sunset";
  language: "ar" | "en";
  sectionsCount: number;
  heroCta: string;
  sections: LandingPageSection[];
  createdAt: string;
}

export interface RecentCreationItem {
  id: string;
  title: string;
  type: "presentation" | "landing" | "document" | "carousel";
  date: string;
  count: number; // slides count or sections count
  theme: "obsidian" | "corporate" | "emerald" | "sunset";
  color: string;
  slidesCount?: number; // compat
}

// Retain alias for backward compatibility
export type RecentDeckItem = RecentCreationItem;
