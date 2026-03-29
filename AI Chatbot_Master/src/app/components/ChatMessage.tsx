import { Bot, User } from "lucide-react";
import { ReactNode } from "react";

interface ChatMessageProps {
  message: string | ReactNode;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({
  message,
  isUser,
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
      </div>
    </div>
  );
}