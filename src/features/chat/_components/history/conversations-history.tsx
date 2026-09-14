import { getTranslations } from "next-intl/server";
import HistorySidebarContent from "./history-sidebar-content";
import { getAllConversations } from "../../apis/chat.api";


export async function ConversationsHistory() {
    const t = await getTranslations("Chat")

    const conversations = await getAllConversations()

    if (!conversations.success) {
        return <p className="text-destructive">{conversations.message || "Failed get conversations"}</p>
    }


    return (
        <HistorySidebarContent title={t("history")} initialConversations={conversations.payload.conversations}/>
    );
}
