import { useState, useRef, useEffect } from "react";
import { Sparkles} from "lucide-react";
import { ChatMessage } from "./components/ChatMessage";
import { StreamingResponse } from "./components/StreamingResponse";
import { ReactNode } from "react";

interface Message {
  id: number;
  text: string | ReactNode;
  timestamp: string;
  isStreaming?: boolean;
}

// Predefined response with ETF comparison
const getPredefinedResponse = (
  userMessage: string,
): string | ReactNode => {
  const message = userMessage.toLowerCase();

  // Return the ETF comparison with explanation and advice
  return (
    <div className="space-y-3">
      <ETFComparison />
      
    </div>
  );
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFooterText, setShowFooterText] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const updateMessageTimestamp = (id: number) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, timestamp } : message,
      ),
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showFooterAfterThinking = () => {
    setShowFooterText(true);
  };

  // Initial AI greeting with ETF comparison after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialResponse: Message = {
        id: 1,
        text: (
          <StreamingResponse
            onStart={() => {
              setIsLoading(false);
              showFooterAfterThinking();
            }}
            onComplete={() => updateMessageTimestamp(1)}
          />
        ),
        timestamp: "",
        isStreaming: true,
      };
      setMessages([initialResponse]);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isLoading) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const userInput = inputValue;
    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowFooterText(false);

    // Simulate AI "thinking" time
    setTimeout(
      () => {
        const responseId = messages.length + 2;
        const aiResponse: Message = {
          id: responseId,
          text: (
            <StreamingResponse
              onStart={() => {
                setIsLoading(false);
                showFooterAfterThinking();
              }}
              onComplete={() => updateMessageTimestamp(responseId)}
            />
          ),
          timestamp: "",
          isStreaming: true,
        };

        setMessages((prev) => [...prev, aiResponse]);
      },
      1500 + Math.random() * 1000,
    ); // Random delay between 1.5-2.5 seconds
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-gray-50">
      <div className="w-full h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-violet-600 text-white p-5 shadow-md">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="mb-8 w-full">
              <div className="max-w-3xl mx-auto px-4">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r">
                  <Sparkles className="w-5 h-5 text-violet-500 animate-spin" />
                  <div className="flex text-base font-medium">
                    <span className="animate-thinking-text">
                      Analysiere ETF A und ETF B...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

          {/*text für standard disclaimer*/}
        <div className="bg-gray-100 border-t border-gray-200 p-5 text-sm text-gray-700 h-[72px] flex items-center justify-center">
          <p className="m-0 text-center">
            {showFooterText
              ? "Der Assistant ist eine KI. Überprüfe wichtige Informationen."
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}