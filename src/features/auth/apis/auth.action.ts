"use server"

import { HEADERS } from "@/shared/constant/api.constant";
import {
    ForgotPasswordFormValues,
    LoginFormValues,
    ResetPasswordFormValues,
} from "../schema/auth.schema";
import { GoogleLoginResponse, LoginResponse, RegisterFormValues } from "../types/auth";
import { IApiResponse } from "@/shared/types/api";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";

export async function loginAction(values: LoginFormValues) {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            ...HEADERS.JsonBody,
        },
    })
    const data: IApiResponse<LoginResponse> = await res.json()
    if (!data.status) {
        throw Error(getErrorMessage(data.message, "Something went wrong"))
 
    }

    return data
}
export async function registerAction(values: RegisterFormValues) {

    const res = await fetch(`${process.env.API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            ...HEADERS.JsonBody,
        },
    })

    const data = await res.json()
    console.log(data)
    if (!data.success!) {
        throw Error(getErrorMessage(data.message, "Something went wrong"))
    }

    return data
}
export async function loginGoogleAction(access_token: string) {
    const res = await fetch(`${process.env.API_URL}/auth/google`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
        },
        body: JSON.stringify({
            access_token,
        }),
    });

    const data: GoogleLoginResponse = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed Error")
    }
    return data
}

export type VerifyEmailParams = {
    id: string;
    hash: string;
    expires: string;
    signature: string;
};

export type VerifyEmailResponse = {
    status: boolean;
    message: string;
};

export async function verifyEmailAction(params: VerifyEmailParams) {
    const query = new URLSearchParams({
        expires: params.expires,
        signature: params.signature,
    });

    const res = await fetch(
        `${process.env.API_URL}/auth/email/verify/${params.id}/${params.hash}?${query}`,
        {
            method: "GET",
            headers: {
                ...HEADERS.JsonBody,
            },
        },
    );

    const data: VerifyEmailResponse = await res.json();

    if (!data.status) {
        throw new Error(data.message || "Email verification failed.");
    }

    return data;
}

export async function forgotPasswordAction(values: ForgotPasswordFormValues) {
    const res = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            ...HEADERS.JsonBody,
        },
    });

    const data: IApiResponse<{}> = await res.json();

    if (!data.status) {
        throw new Error(data.message);
    }

    return data;
}

export async function resetPasswordAction(values: ResetPasswordFormValues) {
    const res = await fetch(`${process.env.API_URL}/auth/reset-password`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            ...HEADERS.JsonBody,
        },
    });

    const data: IApiResponse<{}> = await res.json();

    if (!data.status) {
        throw new Error(data.message);
    }

    return data;
}