"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Message, ChatSession } from "@/app/chat/types";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";

const TravelChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchSessions = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/chat/history", { credentials: "include" });
      const data = await res.json();
      if (data.success) setSessions(data.sessions);
    } catch {
      // silently fail
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const loadSession = async (sid: string) => {
    try {
      const res = await fetch(`/api/chat/history?sessionId=${sid}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setMessages(
          data.messages.map(
            (m: { role: string; content: string; createdAt: string }) => ({
              role: m.role,
              content: m.content,
              createdAt: m.createdAt,
            }),
          ),
        );
        setSessionId(sid);
        setSidebarOpen(false);
      }
    } catch {
      //FAIL
    }
  };

  const deleteSession = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(chatId);
    try {
      const res = await fetch("/api/chat/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ chatId }),
      });
      const data = await res.json();
      if (data.success) {
        setSessions((prev) => prev.filter((s) => s.id !== chatId));
        if (sessionId === chatId) {
          setSessionId(null);
          setMessages([]);
        }
      }
    } catch {
      // FAIL
    } finally {
      setDeletingId(null);
    }
  };

  const startNewChat = () => {
    setSessionId(null);
    setMessages([]);
    setSidebarOpen(false);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: trimmed, sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Сервер алдаа гарлаа");

      if (data.sessionId) {
        setSessionId(data.sessionId);
        fetchSessions();
      }
      setMessages((prev) => [
        ...prev,
        { role: "model", content: data.response },
      ]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Холболтын алдаа гарлаа.";
      setMessages((prev) => [...prev, { role: "model", content: `⚠️ ${msg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const activeSession = sessions.find((s) => s.id === sessionId);

  return (
    <div className="flex h-full overflow-hidden mt-9 bg-slate-50 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        sessions={sessions}
        sessionId={sessionId}
        sidebarOpen={sidebarOpen}
        historyLoading={historyLoading}
        deletingId={deletingId}
        onLoadSession={loadSession}
        onDeleteSession={deleteSession}
        onNewChat={startNewChat}
      />

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <div className="flex flex-shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Түүх нээх"
            className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <p className="flex-1 text-sm font-semibold text-slate-800">
            {activeSession ? activeSession.title : "Шинэ чат"}
          </p>

          {sessionId && (
            <button
              onClick={startNewChat}
              className="text-xs font-medium text-slate-500 transition-colors hover:text-lime-600"
            >
              + Шинэ чат
            </button>
          )}
        </div>

        <MessageList
          messages={messages}
          isLoading={isLoading}
          input={input}
          messagesEndRef={messagesEndRef}
          textareaRef={textareaRef}
          onInputChange={setInput}
          onKeyDown={handleKeyDown}
          onSend={sendMessage}
        />
      </main>
    </div>
  );
};

export default TravelChatBot;
