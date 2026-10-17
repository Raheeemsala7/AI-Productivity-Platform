"use client"

import { useMutation } from "@tanstack/react-query"
import { sendFileMessageAction, sendMessageAction } from "../apis/chat.action"



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