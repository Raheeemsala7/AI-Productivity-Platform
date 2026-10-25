import { HEADERS } from "@/shared/constant/api.constant";
import { isValidTemplateType } from "@/features/templates/types/template";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get("type");
    const lang = searchParams.get("lang") || "ar";
    const categoryId = searchParams.get("category_id");

    // 1. Validate type strictly against supported values
    if (!type || !isValidTemplateType(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid template type. Supported values are 'writing' and 'business'.",
        },
        { status: 400 }
      );
    }

    // 2. Validate user session / token
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

    // 3. Build backend query parameters
    const query = new URLSearchParams();
    query.set("lang", lang);
    query.set("type", type);
    if (categoryId) {
      query.set("category_id", categoryId);
    }

    const backendUrl = `${process.env.API_URL}/user/templates?${query.toString()}`;

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        ...HEADERS.JsonBody,
        ...HEADERS.AcceptLanguage(lang),
        ...HEADERS.authorize(token.token),
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || `Backend error: ${res.statusText || res.status}`,
          data: data.data,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[/api/user/templates] Error forwarding request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while fetching templates",
      },
      { status: 500 }
    );
  }
}
