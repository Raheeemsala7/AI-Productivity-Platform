"use server"

import { LoginFormValues } from "../schema/auth.schema";
import { LoginResponse, RegisterFormValues } from "../types/auth";

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