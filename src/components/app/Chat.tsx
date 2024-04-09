/* eslint-disable tailwindcss/migration-from-tailwind-2 */
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
import { useState } from "react";
import rateLimitLogo from "@/public/logos/rate-limit.svg";
import Image from "next/image";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const path = usePathname();
  const [modal, setModal] = useState(false);
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
          setModal(true);
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
      {modal && (
        <dialog
          open={modal}
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-white p-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative flex flex-col items-center justify-center rounded-xl bg-white p-6">
            <Image src={rateLimitLogo} width={90} alt="rate limit " />
            <h2 className=" text-lg font-semibold text-[#353535]">
              Rate limit exceeded
            </h2>
            <p className="mt-1 text-sm text-[#989692]">
              Please try again in 3 Hours
            </p>
            <button
              className="mt-4 rounded-lg bg-[#7E92F8] px-4 py-2 text-white"
              onClick={() => setModal(false)}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
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
