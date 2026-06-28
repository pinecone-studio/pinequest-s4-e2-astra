"use client";

import React, { RefObject } from "react";
import { Message, cx, QUICK_OPTIONS } from "@/app/chat/types";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  input: string;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: (text: string) => void;
}

const MessageList = ({
  messages,
  isLoading,
  input,
  messagesEndRef,
  textareaRef,
  onInputChange,
  onKeyDown,
  onSend,
}: MessageListProps) => {
  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  return (
    <>
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 pb-16 text-center">
            <span className="text-5xl">🗺️</span>
            <p className="text-lg font-semibold text-slate-700">
              Аяллаа төлөвлөцгөөе
            </p>
            <p className="max-w-xs text-sm text-slate-400">
              Доорх товчноос сонгох эсвэл өөрийн асуултаа бич
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cx(
              "flex items-end gap-2",
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {msg.role === "model" && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lime-100 text-base">
                🤖
              </div>
            )}

            <div
              className={cx(
                "max-w-[72%] rounded-2xl px-4 py-2.5",
                msg.role === "user"
                  ? "rounded-br-sm bg-orange-500 text-white"
                  : "rounded-bl-sm border border-lime-200 bg-lime-50 text-slate-800",
              )}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.content}
              </p>
            </div>

            {msg.role === "user" && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-base">
                👤
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lime-100 text-base">
              🤖
            </div>
            <div className="rounded-2xl rounded-bl-sm border border-lime-200 bg-lime-50 px-4 py-3">
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    className="h-2 w-2 animate-bounce rounded-full bg-lime-400"
                    style={{ animationDelay: `${n * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick options */}
      <div className="flex flex-wrap gap-2 px-4 pb-2">
        {QUICK_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSend(opt.value)}
            disabled={isLoading}
            className="whitespace-nowrap rounded-full border-2 border-lime-400 bg-white px-4 py-2 text-xs font-medium text-lime-800 transition-colors hover:bg-lime-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 border-t border-slate-100 bg-white px-4 pb-4 pt-2">
        <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 transition-all focus-within:border-lime-400 focus-within:ring-2 focus-within:ring-lime-100">
          <textarea
            ref={textareaRef}
            value={input}
            rows={1}
            disabled={isLoading}
            placeholder="Аяллын талаар асуугаарай..."
            onChange={(e) => {
              onInputChange(e.target.value);
              autoResize();
            }}
            onKeyDown={onKeyDown}
            className="max-h-40 flex-1 resize-none bg-transparent text-sm leading-relaxed text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
          />
          <button
            onClick={() => onSend(input)}
            disabled={isLoading || !input.trim()}
            aria-label="Илгээх"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">
          Enter илгээх · Shift+Enter мөр шилжих
        </p>
      </div>
    </>
  );
};

export default MessageList;
