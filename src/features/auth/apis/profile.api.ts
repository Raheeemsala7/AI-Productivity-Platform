import { ApiResponse } from "@/shared/types/api";
import { User } from "../types/auth";

export async function getUserProfile(): Promise<ApiResponse<{ user: User }>> {
  const res = await fetch("/api/user/profile", {
    cache: "no-store",
  });

  const data: ApiResponse<{ user: User }> = await res.json();
  return data;
}