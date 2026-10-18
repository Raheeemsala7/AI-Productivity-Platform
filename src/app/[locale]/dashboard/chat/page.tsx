import ComponentChat from "@/features/chat/_components/main/component-chat";

export default async function ChatPage() {
  return (
    <div className="flex h-dvh w-full flex-1 flex-col min-h-0 overflow-hidden bg-background">
      <ComponentChat />
    </div>
  );
}