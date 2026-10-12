export interface ActiveSubscriptionPlan {
  id: number;
  user_id: number;
  plan_id: number;
  ends_at: string;
  plan: {
      id: number;
      name: string;
  }
}
export interface SubscriptionPlan {
  id: number;
  name: string;
  frequency: string;
  type: string;
  credits: number;
  stripe_price_id: string;        
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
  active_subscription?: ActiveSubscriptionPlan | null;
}

export interface ShowUserData {
  user: UserAdmin;
  current_plan?: string | null;
  has_subscription?: boolean;
}