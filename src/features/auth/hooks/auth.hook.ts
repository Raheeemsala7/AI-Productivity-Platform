"use client"

import { useMutation } from "@tanstack/react-query"
import { registerAction } from "../apis/auth.action"
import { toast } from "sonner"


export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: registerAction,
        onSuccess: () => {
            console.log("data register")
            toast.success("Register success")
        }
    })
}