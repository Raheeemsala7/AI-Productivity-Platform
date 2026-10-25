import { HEADERS } from "@/shared/constant/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user from session token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Parse body and headers
    const body = await request.json().catch(() => ({}));
    const lang = request.headers.get("accept-language") || (body.lang as string) || "ar";

    // 3. Forward request to backend endpoint
    const backendUrl = `${process.env.API_URL}/user/templates/result`;

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        ...HEADERS.JsonBody,
        ...HEADERS.AcceptLanguage(lang),
        ...HEADERS.authorize(token.token),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message || `Backend error: ${res.statusText || res.status}`,
          errors: data?.errors,
          data: data?.data ?? data?.payload,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[/api/user/templates/result] Error forwarding request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while generating template result",
      },
      { status: 500 }
    );
  }
}
