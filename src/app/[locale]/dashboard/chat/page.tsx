import ChatHeader from "@/features/chat/_components/main/chat-header";
import ComponentChat from "@/features/chat/_components/main/component-chat";

export default async function ChatPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden md:px-6 md:py-4">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-1 overflow-hidden rounded-none md:rounded-2xl md:shadow-sm md:ring-1 md:ring-border">
        <section className="relative flex h-full min-w-0 flex-1 flex-col bg-background">
          <ChatHeader />
          <ComponentChat />
        </section>
      </div>
    </div>
  );
}