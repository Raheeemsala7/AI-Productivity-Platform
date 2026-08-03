"use server"

import { IApiResponse } from "@/shared/types/api";
import { LoginFormValues } from "../schema/auth.schema";
import { LoginResponse } from "../types/auth";

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