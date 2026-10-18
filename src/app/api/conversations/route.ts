
import { responseGetConversations } from "@/features/chat/types/chat";
import { HEADERS } from "@/shared/constant/api.constant";
import { ApiResponse } from "@/shared/types/api";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
        if (!token?.token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const res = await fetch(`${process.env.API_URL}/user/conversations`, {
            next: {
                tags: ["conversations"],
            },
            headers: {
                ...HEADERS.JsonBody,
                ...HEADERS.authorize(token.token)
            },
        })

        const data: ApiResponse<responseGetConversations> = await res.json()
        if (!data.success) {
            return NextResponse.json({ success: false, message: data.message }, { status: 500 });
        }
        return NextResponse.json({ success: true, payload: data.payload });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
