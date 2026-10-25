import { HEADERS } from "@/shared/constant/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, props: RouteProps) {
  try {
    const { slug } = await props.params;
    const { searchParams } = request.nextUrl;
    const lang = searchParams.get("lang") || "ar";

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Template slug is required",
        },
        { status: 400 }
      );
    }

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

    const backendUrl = `${process.env.API_URL}/user/templates/${encodeURIComponent(slug)}?lang=${encodeURIComponent(lang)}`;

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
    console.error("[/api/user/templates/[slug]] Error forwarding request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while fetching template details",
      },
      { status: 500 }
    );
  }
}
