import * as React from "react";
import { type UseChatHelpers } from "ai/react";
import { Button } from "@/components/design-system/Button";
import { PromptForm } from "@/components/app/PromptForm";
import { IconRefresh, IconStop } from "@/assets/Icons";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  title?: string;
}

export function ChatPanel({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 w-full animate-in duration-300 ease-in-out md:left-[16%] lg:left-[10%] peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <div className="mx-auto w-full md:w-2/3 md:px-4">
        <div className="flex h-12 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="h-10 w-40 rounded-lg text-xs font-normal"
            >
              <IconStop className="mr-2 h-6 w-6" />
              Stop generating
            </Button>
          ) : (
            messages?.length >= 2 && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => reload()}
                  className="h-10 w-40 rounded-lg text-xs font-normal"
                >
                  <IconRefresh className="mr-2 h-6 w-6" />
                  Regenerate response
                </Button>
              </div>
            )
          )}
        </div>
        <div className="space-y-4 bg-gray-100 p-4 sm:rounded-xl">
          <PromptForm
            onSubmit={async (value: any) => {
              await append({
                id,
                content: value,
                role: "user",
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
