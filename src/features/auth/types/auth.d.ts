

export type User = {
    name: string;
    email: string;
    slogan: string;
    avatar: string | null;
    avatar_color: string;
};


export interface LoginResponse {
    access_token: string;
    expires_in: number;
    user: User
}

/**
 * Register form values
 */
export type RegisterFormValues = z.infer<typeof registerSchema>;