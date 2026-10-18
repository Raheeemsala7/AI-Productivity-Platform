import { HEADERS } from "@/shared/constant/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { extractFilePath } from "@/features/library/utils/library.util";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        if (!token?.token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const pathParam = request.nextUrl.searchParams.get("path");
        if (!pathParam) {
            return NextResponse.json({ success: false, message: "Missing path parameter" }, { status: 400 });
        }

        const cleanPath = extractFilePath(pathParam);
        const res = await fetch(`${process.env.API_URL}/user/files/view?path=${encodeURIComponent(cleanPath)}`, {
            method: "GET",
            headers: {
                ...HEADERS.authorize(token.token),
            },
        });

        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: "File not found or inaccessible" },
                { status: res.status }
            );
        }

        const contentType = res.headers.get("content-type") || "application/octet-stream";
        const isDownload = request.nextUrl.searchParams.get("download") === "1";
        const filename = cleanPath.split("/").pop() || "file";

        const headers: Record<string, string> = {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        };

        if (isDownload) {
            headers["Content-Disposition"] = `attachment; filename="${encodeURIComponent(filename)}"`;
        } else {
            headers["Content-Disposition"] = `inline; filename="${encodeURIComponent(filename)}"`;
        }

        const body = await res.arrayBuffer();
        return new Response(body, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("Error proxying file view:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
