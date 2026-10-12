export interface SubscriptionPlan {
  id: number;
  name: string;
  price?: number;
  slug?: string;
  [key: string]: any;
}

export interface UserAdmin {
  id: number;
  name: string;
  email: string;
  credits: number | null;
  status: number;
  avatar: string | null;
  avatar_color: string;
  slogan: string | null;
  role?: string;
  active_subscription?: SubscriptionPlan | null;
}

export interface ShowUserData {
  user: UserAdmin;
  current_plan?: string | null;
  has_subscription?: boolean;
}