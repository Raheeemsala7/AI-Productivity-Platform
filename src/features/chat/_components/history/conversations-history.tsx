import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import HistorySidebarContent from "./history-sidebar-content";
import { getAllConversations } from "../../apis/chat.api";


export async function ConversationsHistory() {
    const t = await getTranslations("Chat")

    const conversations = await getAllConversations()

    console.log(conversations);
    

    if (!conversations.success) {
        return <p className="text-destructive">{conversations.message || "Failed get conversations"}</p>
    }


    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={{ Chat: (messages as any).Chat }}>
            <HistorySidebarContent title={t("history")} initialConversations={conversations.payload.conversations}/>
        </NextIntlClientProvider>
    );
}
