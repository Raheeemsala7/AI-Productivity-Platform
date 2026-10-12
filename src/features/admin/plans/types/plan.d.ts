export interface Plan {
  id: number;
  plan_uuid?: string;
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
  price: string | number;
  currency?: string;
  frequency: string;
  credits: number;
  active: boolean;
  is_featured: boolean;
  is_free?: boolean;
  is_one_time?: boolean;
  type?: string;
  trial_days: number;
  features: string[];
  features_ar?: string[];
  stripe_price_id?: string;
  stripe_product_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PlansApiResponse {
  success?: boolean;
  status?: boolean;
  message?: string;
  payload?: {
    data: Plan[];
    pagination?: any;
  };
  data?: Plan[] | Plan;
}
