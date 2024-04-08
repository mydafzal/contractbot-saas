"use client";

import { useChat, type Message } from "ai/react";

import cn from "@/lib/cn";
import { ChatList } from "./ChatList";
import { ChatPanel } from "@/components/app/ChatPanel";
import { EmptyScreen } from "@/components/app/EmptyScreen";
import { ChatScrollAnchor } from "./ChatScrollAnchor";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const path = usePathname();
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    "ai-token",
    null
  );
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        } else if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again in 3 hours.");
        }
      },
      onFinish() {
        if (!path?.includes("chat")) {
          window.history.pushState({}, "", `/ccript/chat/${id}`);
        }
      },
    });
  return (
    <>
      <div className={cn("pb-[200px] pt-4 md:pt-14", className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  );
}
