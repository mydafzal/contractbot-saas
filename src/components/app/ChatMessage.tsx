// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import type { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import cn from "@/lib/cn";
import { CodeBlock } from "@/components/design-system/CodeBlack";
import { MemoizedReactMarkdown } from "@/components/app/MemoizedReactMarkdown";
import { ChatMessageActions } from "@/components/app/ChatMessageActions";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn("group relative flex items-start px-2 py-4 ")}
      {...props}
    >
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words prose-p:leading-relaxed prose-pre:p-0 dark:prose-invert"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return (
                <p
                  className={
                    message.role === "user"
                      ? "mb-2 text-white last:mb-0"
                      : "mb-2 text-gray-500 last:mb-0"
                  }
                >
                  {children}
                </p>
              );
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        {message.role === "assistant" && (
          <ChatMessageActions message={message} />
        )}
      </div>
    </div>
  );
}
