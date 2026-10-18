import { HEADERS } from "@/shared/constant/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        if (!token?.token) {
            return NextResponse.json({ success: false, message: "Unauthorized", payload: { files: [] } }, { status: 401 });
        }

        const res = await fetch(`${process.env.API_URL}/user/library`, {
            method: "GET",
            headers: {
                ...HEADERS.JsonBody,
                ...HEADERS.authorize(token.token),
            },
            cache: "no-store",
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in /api/user/library:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error", payload: { files: [] } },
            { status: 500 }
        );
    }
}
