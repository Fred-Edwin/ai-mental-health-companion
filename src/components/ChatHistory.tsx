import { useEffect, useRef } from 'react';
import { User, Bot, Volume2 } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';
import type { ChatMessage } from '@/types';

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  className?: string;
}

export function ChatHistory({ messages, isLoading = false, className }: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <div className="text-center text-gray-500">
          <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
          <p className="text-sm">Click the microphone button and start talking to your AI companion</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth",
        className
      )}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex items-start space-x-3",
            message.role === 'user' ? "justify-end" : "justify-start"
          )}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          )}

          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2 shadow-sm",
              message.role === 'user'
                ? "bg-blue-600 text-white ml-12"
                : "bg-gray-100 text-gray-900 mr-12"
            )}
          >
            <div className="flex items-start justify-between">
              <p className="text-sm leading-relaxed break-words">
                {message.content}
              </p>
              {message.type === 'audio' && (
                <Volume2 className="h-3 w-3 ml-2 mt-0.5 flex-shrink-0 opacity-60" />
              )}
            </div>
            
            <div
              className={cn(
                "text-xs mt-1 opacity-70",
                message.role === 'user' ? "text-blue-100" : "text-gray-500"
              )}
            >
              {formatTime(message.timestamp)}
            </div>
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Loading indicator for pending responses */}
      {isLoading && (
        <div className="flex items-start space-x-3 justify-start">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="h-4 w-4 text-blue-600" />
            </div>
          </div>

          <div className="bg-gray-100 text-gray-900 mr-12 max-w-[80%] rounded-lg px-4 py-2 shadow-sm">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs text-gray-500 ml-2">AI is thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}