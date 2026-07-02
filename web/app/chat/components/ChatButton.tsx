import { Volume2, VolumeX } from "lucide-react";

interface SpeakButtonProps {
  content: string;
  isPlaying: boolean;
  onSpeak: (content: string) => void;
  onStopSpeaking: () => void;
}

export function SpeakButton({
  content,
  isPlaying,
  onSpeak,
  onStopSpeaking,
}: SpeakButtonProps) {
  return (
    <div className="flex justify-end mb-1">
      <button
        onClick={() => (isPlaying ? onStopSpeaking() : onSpeak(content))}
        className="p-1 rounded-lg text-slate-400 hover:text-[#0A4429] transition-colors"
      >
        {isPlaying ? (
          <VolumeX className="h-3.5 w-3.5" />
        ) : (
          <Volume2 className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
