"use client";
import React, { useState, useRef, useEffect } from "react";

interface AppLaunchState {
  phase: "idle" | "launching" | "rotating" | "fullscreen" | "closing";
  originX: number;
  originY: number;
  iconWidth: number;
  iconHeight: number;
}

export function VideoAppScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full h-full flex flex-col bg-black text-white">
      {/* Status bar area */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2 flex-shrink-0">
        <span className="text-[13px] font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
            <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4" />
            <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6" />
            <rect x="9" y="0" width="3" height="12" rx="1" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <path
              d="M8 2.4C10.5 2.4 12.7 3.4 14.3 5L16 3.3C13.9 1.3 11.1 0 8 0C4.9 0 2.1 1.3 0 3.3L1.7 5C3.3 3.4 5.5 2.4 8 2.4Z"
              opacity="0.4"
            />
            <path
              d="M8 5.6C9.7 5.6 11.2 6.3 12.3 7.4L14 5.7C12.4 4.1 10.3 3.2 8 3.2C5.7 3.2 3.6 4.1 2 5.7L3.7 7.4C4.8 6.3 6.3 5.6 8 5.6Z"
              opacity="0.7"
            />
            <circle cx="8" cy="11" r="1.5" />
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-3 rounded-[3px] border border-white/50 p-[2px]">
              <div className="w-full h-full bg-white rounded-[1px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
        <h1 className="text-[22px] font-bold tracking-tight">Video</h1>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="px-5 mb-4 flex-shrink-0">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-zinc-900 to-zinc-950" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="white">
                <path d="M2 2L18 11L2 20V2Z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-[11px] text-white/60 uppercase tracking-wider mb-1">
              Featured
            </p>
            <p className="text-[15px] font-semibold leading-tight">
              Cinematic Landscapes of Mongolia
            </p>
          </div>
          <div className="absolute top-3 right-3 bg-black/60 rounded px-1.5 py-0.5">
            <span className="text-[10px] text-white font-medium">
              4K • 12:34
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-y-auto pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-semibold">Recents</h2>
          <button className="text-[14px] text-blue-400">See All</button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            {
              title: "City Time-lapse",
              duration: "3:21",
              color: "from-blue-900/60",
            },
            {
              title: "Sunset at Terelj",
              duration: "7:05",
              color: "from-orange-900/60",
            },
            {
              title: "Winter Morning",
              duration: "2:48",
              color: "from-teal-900/60",
            },
          ].map((v, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-24 h-16 rounded-xl bg-gradient-to-br ${v.color} via-zinc-900 to-zinc-950 flex-shrink-0 relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="white"
                    >
                      <path d="M1 1L9 6L1 11V1Z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-2">
                  <span className="text-[9px] text-white/70">{v.duration}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium truncate">{v.title}</p>
                <p className="text-[12px] text-white/50 mt-0.5">Today</p>
              </div>
              <button className="w-7 h-7 flex items-center justify-center">
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="white"
                  opacity="0.4"
                >
                  <circle cx="2" cy="2" r="1.5" />
                  <circle cx="2" cy="8" r="1.5" />
                  <circle cx="2" cy="14" r="1.5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface VideoAppIconProps {
  name: string;
  icon: string;
}

export function VideoAppIcon({ name, icon }: VideoAppIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [launch, setLaunch] = useState<AppLaunchState>({
    phase: "idle",
    originX: 0,
    originY: 0,
    iconWidth: 60,
    iconHeight: 60,
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
      iconWidth: rect.width,
      iconHeight: rect.height,
    });

    setTimeout(() => {
      setLaunch((s) => ({ ...s, phase: "rotating" }));
    }, 320);

    // Phase 3: fullscreen
    setTimeout(() => {
      setLaunch((s) => ({ ...s, phase: "fullscreen" }));
    }, 700);
  };

  const handleClose = () => {
    setLaunch((s) => ({ ...s, phase: "closing" }));
    setTimeout(() => {
      setLaunch((s) => ({ ...s, phase: "idle" }));
    }, 500);
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
          className="fixed inset-0 z-[9999]"
          style={{ pointerEvents: phase === "fullscreen" ? "auto" : "none" }}
        >
          {/* Expanding black background */}
          <div
            className="absolute inset-0 bg-black"
            style={{
              transformOrigin: `${ox}% ${oy}%`,
              transform:
                phase === "launching"
                  ? "scale(0.08)"
                  : phase === "rotating" || phase === "fullscreen"
                    ? "scale(1)"
                    : phase === "closing"
                      ? "scale(0.05)"
                      : "scale(0.08)",
              opacity:
                phase === "launching" ? 0.7 : phase === "closing" ? 0 : 1,
              transition:
                phase === "launching"
                  ? "transform 320ms cubic-bezier(0.32,0,0.67,0), opacity 320ms ease"
                  : phase === "rotating"
                    ? "transform 380ms cubic-bezier(0.22,1,0.36,1)"
                    : phase === "closing"
                      ? "transform 400ms cubic-bezier(0.32,0,0.67,0), opacity 350ms ease"
                      : "none",
            }}
          />

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: phase === "launching" ? 1 : phase === "rotating" ? 0 : 0,
              transition: phase === "rotating" ? "opacity 200ms ease" : "none",
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-2xl">
                <svg width="32" height="28" viewBox="0 0 28 24" fill="white">
                  <rect x="0" y="3" width="18" height="18" rx="3" />
                  <path d="M18 8.5L28 3V21L18 15.5V8.5Z" />
                </svg>
              </div>
              <span className="text-white text-[17px] font-semibold tracking-tight">
                Video
              </span>
            </div>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform:
                phase === "rotating"
                  ? "rotate(90deg) scale(1.02)"
                  : phase === "fullscreen"
                    ? "rotate(90deg)"
                    : phase === "closing"
                      ? "rotate(0deg) scale(0.9)"
                      : "rotate(0deg)",
              opacity:
                phase === "launching"
                  ? 0
                  : phase === "rotating"
                    ? 0
                    : phase === "closing"
                      ? 0
                      : 1,
              transition:
                phase === "rotating"
                  ? "transform 380ms cubic-bezier(0.22,1,0.36,1), opacity 100ms ease 280ms"
                  : phase === "fullscreen"
                    ? "none"
                    : phase === "closing"
                      ? "transform 400ms cubic-bezier(0.32,0,0.67,0), opacity 250ms ease"
                      : "none",
            }}
          >
            <div
              style={{
                width: `${vh}px`,
                height: `${vw}px`,
                overflow: "hidden",
              }}
            >
              <VideoAppScreen onClose={handleClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoAppScreen;
