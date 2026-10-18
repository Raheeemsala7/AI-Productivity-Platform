import { HEADERS } from "@/shared/constant/api.constant";
import { ApiResponse } from "@/shared/types/api";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/features/auth/types/auth";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const res = await fetch(`${process.env.API_URL}/auth/profile`, {
      headers: {
        ...HEADERS.JsonBody,
        ...HEADERS.authorize(token.token),
      },
      cache: "no-store",
    });

    const data = await res.json();
    console.log("[/api/user/profile] Backend status:", res.status, "Data:", JSON.stringify(data));

    const isOk = res.ok && (data.status === true || data.success === true || (data.status !== false && data.success !== false));

    if (!isOk) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to fetch profile" },
        { status: res.status !== 200 ? res.status : 400 },
      );
    }

    const user: User = data.payload?.user ?? data.payload ?? data.data?.user ?? data.data;

    return NextResponse.json({
      success: true,
      payload: { user },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
