"use client"

import { useMutation } from "@tanstack/react-query"
import { sendMessageAction } from "../apis/chat.action"



export function sendMessageMutation() {
  return useMutation({
    mutationFn : sendMessageAction
  })
}