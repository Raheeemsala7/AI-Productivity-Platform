import { NextRequest, NextResponse } from "next/server";
import { getConversationMessagesApi } from "@/features/chat/apis/chat.api";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const messages = await getConversationMessagesApi(id,request);
        return NextResponse.json(messages);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch messages" },
            { status: 500 }
        );
    }
}
