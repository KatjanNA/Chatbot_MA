import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2, Loader2Icon } from "lucide-react";
import { ChatMessage } from "./components/ChatMessage";
import { StreamingResponse } from "./components/StreamingResponse";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { ReactNode } from "react";
import iconSvg from "../imports/ICON01.svg";

interface Message {
  id: number;
  text: string | ReactNode;
  isUser: boolean;
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
      <div className="text-sm leading-relaxed">
        <p className="mb-3">
          Basierend auf der Analyse der beiden ETFs möchte ich
          Ihnen folgende Einschätzung geben:
        </p>
        <p className="mb-3">
          <strong>ETF A (Alpha Global)</strong> bietet eine
          höhere Rendite von 5,2% und investiert weltweit in
          dynamische Wachstumsbranchen. Die mittlere
          Risikoklasse ermöglicht attraktive Ertragschancen.
        </p>
        <p className="mb-3">
          <strong>ETF B (Beta Nachhaltig)</strong> fokussiert
          sich auf nachhaltige europäische Investments mit
          niedriger Risikoklasse und geringeren Kosten. Die
          Rendite ist mit 3,1% moderater, dafür aber stabiler.
        </p>
        <div className="bg-violet-50 border-l-4 border-violet-500 p-3 rounded mt-3">
          <p className="font-semibold text-violet-900 mb-2">
            💡 Meine Empfehlung:
          </p>
          <p className="text-violet-800">
            Für eine höhere und bessere Diversifikation sollte
            man <strong>40% in A</strong> und{" "}
            <strong>60% in B</strong> investieren.
          </p>
        </div>

        <p className="mb-6 text-gray-600 mt-3">
          Diese Aufteilung kombiniert das Wachstumspotenzial von
          ETF A mit der Stabilität und Nachhaltigkeit von ETF B,
          während gleichzeitig das Risiko optimal verteilt wird.
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [displayedDisclaimer, setDisplayedDisclaimer] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const disclaimerText =
    "Diese Inhalte wurden von einer Künstlichen Intelligenz erstellt. Sie dienen zu Informationszwecken, können Fehler enthalten und ersetzen keine professionelle Beratung. Bitte prüfe wichtigen Angaben eigenständig, bevor auf deren Basis gehandelt wird.";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showDisclaimer) {
      const words = disclaimerText.split(" ");
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < words.length) {
          setDisplayedDisclaimer((prev) =>
            prev ? prev + " " + words[index] : words[index]
          );
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);
      return () => clearInterval(intervalId);
    }
  }, [showDisclaimer]);

  // Initial AI greeting with ETF comparison after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialResponse: Message = {
        id: 1,
        text: (
          <StreamingResponse
            onStart={() => setIsLoading(false)}
            onComplete={() => {
              setTimeout(() => setShowDisclaimer(true), 2000);
            }}
          />
        ),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const userInput = inputValue;
    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowDisclaimer(false);
    setDisplayedDisclaimer("");

    // Simulate AI "thinking" time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: (
            <StreamingResponse
              onStart={() => setIsLoading(false)}
              onComplete={() => {
                setTimeout(() => setShowDisclaimer(true), 2000);
              }}
            />
          ),
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
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
            <h1 className="text-2xl font-semibold">KI Assistent</h1>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
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

        {/* Disclaimer Area */}
        {showDisclaimer && (
          <div className="border-t border-gray-200 bg-gray-50 p-6 animate-fade-in">
            <div className="max-w-5xl mx-auto">
              <div className="flex gap-4 items-start bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <img
                  src={iconSvg}
                  alt="AI"
                  className="w-8 h-8 flex-shrink-0 mt-1"
                />
                <p className="text-sm text-gray-700 leading-relaxed">
                  {displayedDisclaimer}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}