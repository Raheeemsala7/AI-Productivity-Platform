export interface LoginResponse {
    success: boolean
    message: string
    access_token: string
    token_type: "bearer",
    expires_in: number
}

/**
 * Register form values
 */
export type RegisterFormValues = z.infer<typeof registerSchema>;