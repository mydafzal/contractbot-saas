import { type Message } from "ai";
import { ChatMessage } from "@/components/app/ChatMessage";

export interface ChatList {
  messages: Message[];
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto w-full px-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.role === "user"
              ? "mb-4 rounded-2xl bg-gradient-to-r from-indigo-400 to-indigo-500 md:ml-[40%]"
              : "mb-4 rounded-2xl bg-gray-100 md:mr-[30%]"
          }
        >
          <ChatMessage message={message} />
        </div>
      ))}
    </div>
  );
}
