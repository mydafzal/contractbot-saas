import * as React from "react";
import Textarea from "react-textarea-autosize";
import type { UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "@/lib/useEnterSubmit";
import { Button } from "@/components/design-system/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/design-system/ToolTip";
import { IconArrowElbow } from "@/assets/Icons";
import { useRouter } from "next/navigation";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!input?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(input);
      }}
      ref={formRef}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex max-h-60 w-[90%] grow flex-col overflow-hidden rounded-xl bg-gray-200 text-gray-500">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything."
            spellCheck={false}
            className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          />
        </div>
        <div className="">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                className="h-12 w-12 rounded-full bg-indigo-400 hover:bg-indigo-600"
                disabled={isLoading || input === ""}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
