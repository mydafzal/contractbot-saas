import type { UseChatHelpers } from "ai/react";

import { Button } from "@/components/design-system/Button";

const exampleMessages = [
  {
    heading:
      "Can you explain the process of filing for bankruptcy and how it affects individuals or businesses differently?",
    message: `Can you explain the process of filing for bankruptcy and how it affects individuals or businesses differently?`,
  },
  {
    heading:
      "In cases of intellectual property infringement, what are the common remedies available to the aggrieved party?",
    message:
      "In cases of intellectual property infringement, what are the common remedies available to the aggrieved party?",
  },
  {
    heading:
      "What are the key steps one should take when preparing to draft a legally binding contract?",
    message: `What are the key steps one should take when preparing to draft a legally binding contract?`,
  },
];

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col items-center p-8">
        <h1 className="mb-2 text-lg font-semibold">Type something like:</h1>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto bg-gray-100 font-normal text-gray-600 hover:bg-gray-200 hover:text-gray-700"
              onClick={() => setInput(message.message)}
            >
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
