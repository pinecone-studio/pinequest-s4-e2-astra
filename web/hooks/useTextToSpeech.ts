"use client";

import axios from "axios";
import { useRef, useState } from "react";

export function useTextToSpeech() {
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function stripMarkdown(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/#{1,6}\s/g, "")
      .replace(/`{1,3}[^`]*`{1,3}/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/[⚠️🌲🚗🏕️✅❌🔥💡📍🗺️]/gu, "")
      .replace(/[^\u0400-\u04FF\s?,!.\-'":,]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);
  }
  const speak = async (text: string) => {
    if (!isVoiceMode || !text) return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      setIsPlaying(true);

      const response = await axios.post(
        "/api/tts",
        { text: stripMarkdown(text) },
        {
          responseType: "blob",
        },
      );

      const blob = response.data;
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);

      await audio.play();
    } catch (err) {
      console.error("TTS тоглуулахад алдаа гарлаа:", err);
      setIsPlaying(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleVoiceMode = () => {
    const nextMode = !isVoiceMode;
    setIsVoiceMode(nextMode);
    if (!nextMode) {
      stopSpeaking();
    }
  };

  return {
    isVoiceMode,
    isPlaying,
    speak,
    stopSpeaking,
    toggleVoiceMode,
  };
}
