import { HEADERS } from "@/shared/constant/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/features/auth/types/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store",
};

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401, headers: NO_CACHE_HEADERS },
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

    const isOk =
      res.ok &&
      (data.status === true ||
        data.success === true ||
        (data.status !== false && data.success !== false));

    if (!isOk) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to fetch profile" },
        { status: res.status !== 200 ? res.status : 400, headers: NO_CACHE_HEADERS },
      );
    }

    const user: User =
      data.payload?.user ?? data.payload ?? data.data?.user ?? data.data;

    return NextResponse.json(
      {
        success: true,
        payload: { user },
      },
      {
        headers: NO_CACHE_HEADERS,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500, headers: NO_CACHE_HEADERS },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401, headers: NO_CACHE_HEADERS },
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let body: any;
    let headers: Record<string, string> = {
      Authorization: `Bearer ${token.token}`,
      Accept: "application/json",
    };

    if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else {
      body = JSON.stringify(await request.json());
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${process.env.API_URL}/auth/profile`, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    const data = await res.json();
    const isOk =
      res.ok &&
      (data.status === true ||
        data.success === true ||
        (data.status !== false && data.success !== false));

    if (!isOk) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to update profile" },
        { status: res.status !== 200 ? res.status : 400, headers: NO_CACHE_HEADERS },
      );
    }

    const user: User =
      data.payload?.user ?? data.payload ?? data.data?.user ?? data.data;

    return NextResponse.json(
      {
        success: true,
        message: data.message || "Profile updated successfully",
        payload: { user },
      },
      {
        headers: NO_CACHE_HEADERS,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500, headers: NO_CACHE_HEADERS },
    );
  }
}
