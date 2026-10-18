"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../apis/profile.api";
import { User } from "../types/auth";

export const USER_PROFILE_QUERY_KEY = ["user-profile"] as const;

export function useUserProfile(initialUser?: User) {
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: async (): Promise<User> => {
      const data = await getUserProfile();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch user profile");
      }
      return data.payload.user;
    },
    placeholderData: initialUser,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
