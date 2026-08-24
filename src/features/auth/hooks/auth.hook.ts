"use client"

import { useMutation } from "@tanstack/react-query"
import { registerAction } from "../apis/auth.action"


export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: registerAction,
    })
}