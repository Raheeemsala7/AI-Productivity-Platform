

export interface SubscriptionPlan {
  id: number;
  name: string;
}
export interface UserAdmin {
    id: number
    name: string
    email: string
    credits: number | null
    status: number
    avatar: string | null
    avatar_color: string
    slogan: string | null
    active_subscription: SubscriptionPlan
}