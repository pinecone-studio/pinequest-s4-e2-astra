"use client";

import React from "react";
import { ChatSession, cx } from "@/app/chat/types";

interface SidebarProps {
  sessions: ChatSession[];
  sessionId: string | null;
  sidebarOpen: boolean;
  historyLoading: boolean;
  deletingId: string | null;
  onLoadSession: (id: string) => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  onNewChat: () => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("mn-MN", {
    month: "short",
    day: "numeric",
  });
}

const Sidebar = ({
  sessions,
  sessionId,
  sidebarOpen,
  historyLoading,
  deletingId,
  onLoadSession,
  onDeleteSession,
  onNewChat,
}: SidebarProps) => (
  <div
    className={cx(
      "absolute inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-slate-100 bg-white transition-transform duration-300 ease-in-out",
      "lg:relative lg:translate-x-0",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
    )}
  >
    {/* Header */}
    <div className="flex items-center justify-between border-b border-slate-100 p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌏</span>
        <span className="text-sm font-semibold text-slate-800">
          Аяллын туслах
        </span>
      </div>
      <button
        onClick={onNewChat}
        className="flex items-center gap-1 rounded-full bg-lime-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-lime-600"
      >
        + Шинэ
      </button>
    </div>

    {/* Session list */}
    <div className="flex-1 space-y-1 overflow-y-auto p-3">
      <p className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-slate-400">
        Чатны түүх
      </p>

      {historyLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
        </div>
      )}

      {!historyLoading && sessions.length === 0 && (
        <p className="py-6 text-center text-xs text-slate-400">
          Чатны түүх хоосон байна
        </p>
      )}

      {sessions.map((s) => (
        <div
          key={s.id}
          onClick={() => onLoadSession(s.id)}
          className={cx(
            "group flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2.5 transition-colors",
            s.id === sessionId
              ? "border-lime-200 bg-lime-50"
              : "border-transparent hover:bg-slate-50",
          )}
        >
          <div className="min-w-0 flex-1">
            <p
              className={cx(
                "truncate text-sm font-medium",
                s.id === sessionId ? "text-lime-800" : "text-slate-700",
              )}
            >
              {s.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              {formatDate(s.createdAt)}
            </p>
          </div>

          <button
            onClick={(e) => onDeleteSession(s.id, e)}
            disabled={deletingId === s.id}
            aria-label="Устгах"
            className="flex flex-shrink-0 items-center justify-center rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
          >
            {deletingId === s.id ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
            ) : (
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Sidebar;
