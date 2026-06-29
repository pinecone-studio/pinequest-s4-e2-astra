"use client";
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface AppLaunchState {
  phase: "idle" | "launching" | "fullscreen" | "closing";
  originX: number;
  originY: number;
}

interface VideoAppIconProps {
  name: string;
  icon: string;
  onOpenChange?: (open: boolean) => void;
}

export function VideoAppIcon({ name, icon, onOpenChange }: VideoAppIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [launch, setLaunch] = useState<AppLaunchState>({
    phase: "idle",
    originX: 0,
    originY: 0,
  });

  useEffect(() => {
    if (launch.phase !== "idle") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [launch.phase]);

  const handleTap = () => {
    if (launch.phase !== "idle") return;
    if (!iconRef.current) return;

    const rect = iconRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    setLaunch({
      phase: "launching",
      originX: cx,
      originY: cy,
    });

    if (onOpenChange) {
      onOpenChange(true);
    }

    // Small delay to trigger the expand transition from standard scale
    setTimeout(() => {
      setLaunch((s) => ({ ...s, phase: "fullscreen" }));
    }, 50);
  };

  const handleClose = () => {
    setLaunch((s) => ({ ...s, phase: "closing" }));
    if (onOpenChange) {
      onOpenChange(false);
    }
    setTimeout(() => {
      setLaunch((s) => ({ ...s, phase: "idle" }));
    }, 600); // Wait for the transition to finish
  };

  const isActive = launch.phase !== "idle";
  const { phase, originX, originY } = launch;

  const vw = typeof window !== "undefined" ? window.innerWidth : 390;
  const vh = typeof window !== "undefined" ? window.innerHeight : 844;
  const ox = ((originX / vw) * 100).toFixed(1);
  const oy = ((originY / vh) * 100).toFixed(1);

  return (
    <>
      <div
        ref={iconRef}
        className="flex flex-col items-center gap-1 cursor-pointer group active:scale-95 transition-transform duration-100"
        onClick={handleTap}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="w-[60px] h-[60px] rounded-xl overflow-hidden shadow-md">
          {icon && icon !== "/" ? (
            <img
              src={icon}
              alt={name}
              className="w-full h-full object-cover group-hover:opacity-90"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
              <svg
                width="28"
                height="24"
                viewBox="0 0 28 24"
                fill="white"
                opacity="0.9"
              >
                <rect x="0" y="3" width="18" height="18" rx="3" />
                <path d="M18 8.5L28 3V21L18 15.5V8.5Z" />
              </svg>
            </div>
          )}
        </div>
        <span className="text-[10px] text-white font-medium text-center truncate w-14 drop-shadow">
          {name}
        </span>
      </div>

      {isActive && (
        <div
          className="fixed inset-0 z-[9999] overflow-hidden bg-transparent"
          style={{ pointerEvents: phase === "fullscreen" ? "auto" : "none" }}
        >
          {/* Smooth expanding black background */}
          <div
            className="absolute inset-0 bg-black"
            style={{
              transformOrigin: `${ox}% ${oy}%`,
              transform:
                phase === "launching"
                  ? "scale(0.08)"
                  : phase === "fullscreen"
                    ? "scale(1)"
                    : "scale(0.08)",
              opacity:
                phase === "launching" ? 0 : phase === "closing" ? 0 : 1,
              transition:
                phase === "closing"
                  ? "transform 600ms cubic-bezier(0.32, 0, 0.67, 0), opacity 500ms ease"
                  : "transform 750ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease",
            }}
          />

          {/* Fullscreen Close control - Fades in slowly after expand is complete */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: phase === "fullscreen" ? 1 : 0,
              pointerEvents: phase === "fullscreen" ? "auto" : "none",
            }}
          >
            {/* Close button on the top right side of the screen, safely below status bar/notch */}
            <button
              onClick={handleClose}
              className="absolute top-14 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 z-[10000] shadow-lg backdrop-blur-sm border border-white/15"
              aria-label="Хаах"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Keep export default mapping for compatibility if any other imports use default
export default function DummyVideoAppScreen() {
  return null;
}
