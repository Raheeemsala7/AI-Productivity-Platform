"use client"

import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { sendFileMessageAction, sendMessageAction } from "../apis/chat.action"
import { useSearchParams } from "next/navigation"
import { ApiResponse } from "@/shared/types/api"
import { responseGetConversations } from "../types/chat"



export function sendMessageMutation() {
  return useMutation({
    mutationFn: sendMessageAction
  })
}

export function sendFileMessageMutation() {
  return useMutation({
    mutationFn: sendFileMessageAction
  })
}


export function getInfiniteConversations() {
    // Search params
    const searchParams = useSearchParams()

    // Variables
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10

    return useInfiniteQuery({
        queryKey: ["conversations", page, limit],
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            const res = await fetch(`/api/conversations/?page=${pageParam}&limit=${limit}`)

            const data: ApiResponse<responseGetConversations> = await res.json()

            if (!data.success) {
                throw new Error(data.message || "Error")
            }

            return data.payload
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages): number | undefined => {
            if (!lastPage?.conversations || lastPage.conversations.length < limit) {
                return undefined
            }
            return allPages.length + 1
        }
    })
}