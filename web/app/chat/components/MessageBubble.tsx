import { cx, Message } from "@/app/chat/types";
import { Compass, User } from "lucide-react";
import { SpeakButton } from "./ChatButton";

interface MessageBubbleProps {
  msg: Message;
  isPlaying: boolean;
  onSpeak: (content: string) => void;
  onStopSpeaking: () => void;
}

export function MessageBubble({
  msg,
  isPlaying,
  onSpeak,
  onStopSpeaking,
}: MessageBubbleProps) {
  return (
    <div
      className={cx(
        "flex items-start gap-2.5",
        msg.role === "user" ? "justify-end" : "justify-start",
      )}
    >
      {msg.role === "model" && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A4429]/10 text-[#0A4429] border border-[#0A4429]/10">
          <Compass className="h-4 w-4" />
        </div>
      )}

      <div
        className={cx(
          "max-w-[75%] rounded-[20px] px-4 py-2.5 shadow-sm text-sm leading-relaxed",
          msg.role === "user"
            ? "rounded-br-sm bg-linear-to-r from-[#0A4429] to-[#0A4429] text-white font-medium"
            : "rounded-bl-sm border border-slate-100 bg-white text-slate-800",
        )}
      >
        {msg.role === "model" && (
          <SpeakButton
            content={msg.content}
            isPlaying={isPlaying}
            onSpeak={onSpeak}
            onStopSpeaking={onStopSpeaking}
          />
        )}
        <p className="whitespace-pre-wrap">{msg.content}</p>
      </div>

      {msg.role === "user" && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 border border-slate-300/30">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
