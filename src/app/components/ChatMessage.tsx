import { ReactNode } from "react";

interface ChatMessageProps {
  message: string | ReactNode;
  timestamp: string;
}

export function ChatMessage({
  message,
  timestamp,
}: ChatMessageProps) {
  return (
    <div className="mb-8 w-full">
      <div className="max-w-3xl mx-auto px-4">
        {typeof message === "string" ? (
          <p className="text-base leading-relaxed text-gray-800">
            {message}
          </p>
        ) : (
          message
        )}
        {timestamp && (
          <p className="mt-2 text-right text-xs text-gray-500">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}