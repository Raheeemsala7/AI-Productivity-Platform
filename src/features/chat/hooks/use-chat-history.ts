"use client"

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sendFileMessageAction, sendMessageAction } from "../apis/chat.action"
import { useSearchParams } from "next/navigation"
import { ApiResponse } from "@/shared/types/api"
import { responseGetConversations } from "../types/chat"
import { USER_PROFILE_QUERY_KEY } from "@/features/auth/hooks/use-user-profile"

export function sendMessageMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sendMessageAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY })
    },
  })
}

export function sendFileMessageMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sendFileMessageAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY })
    },
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