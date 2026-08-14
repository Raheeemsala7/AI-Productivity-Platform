

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



export interface GoogleLoginUser {
    id: number;
    name: string;
    email: string;
    google_id: string;
    email_verified_at: string | null;
    avatar: string | null;
    avatar_color: string;
    slogan: string;
    created_at: string;
    updated_at: string;
}

export type GoogleLoginResponse =
    | {
        success: true;
        message: string;
        token: string;
        token_type: "Bearer";
        user: GoogleLoginUser;
    }
    | {
        success: false;
        message: string;
        token?: never;
        token_type?: never;
        user?: never;
    };