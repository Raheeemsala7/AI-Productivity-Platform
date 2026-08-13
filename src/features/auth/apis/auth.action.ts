"use server"

import { HEADERS } from "@/shared/constant/api.constant";
import { LoginFormValues } from "../schema/auth.schema";
import { LoginResponse, RegisterFormValues } from "../types/auth";
import { IApiResponse } from "@/shared/types/api";

export async function loginAction(values: LoginFormValues) {

    const res = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json",
        }
    })

    const data: LoginResponse = await res.json()
    console.log("data login", data)
    if (!data.success) {
        throw Error(data.message)
    }

    return data
}
export async function registerAction(values: RegisterFormValues) {

    const res = await fetch(`${process.env.API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json",
        }
    })

    const data = await res.json()
    console.log("data register", data)
    if (!data.success) {
        throw Error(data.message)
    }

    return data
}

export async function loginGoogleAction(id_token: string) {
    const res = await fetch(`${process.env.API_URL}/auth/google`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.AcceptLanguage("ar")
        },
        body: JSON.stringify({
            id_token,
        }),
    });

    const data: IApiResponse<{}> = await res.json();

    console.log(data)
    if (!data.success) {
        throw new Error("Failed Error")
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