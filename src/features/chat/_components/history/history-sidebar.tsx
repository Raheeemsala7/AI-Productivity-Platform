import { getAllConversations } from "../../apis/chat.api";

export default async function HistorySidebar() {
  const conversations = await getAllConversations();
  return <div>HistorySidebar</div>;
}
