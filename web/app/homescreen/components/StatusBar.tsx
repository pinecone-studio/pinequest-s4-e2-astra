import { useState, useEffect } from "react";

export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-3"
      style={{ height: "44px" }}
    >
      {/* Цаг — зүүн тал */}
      <span className="text-white text-[15px] font-semibold tracking-tight">
        {time}
      </span>
      {/* Dynamic Island орох зай */}
      <div className="w-[120px] h-[34px]" />
      {/* Баруун тал: signal, wifi, battery */}
      <div className="flex items-center gap-[6px]">
        {/* Сүлжээний signal bars */}
        <div className="flex items-end gap-[1.5px] h-[12px]">
          {[3, 5, 8, 11].map((h, i) => (
            <div
              key={i}
              className="w-[3px] rounded-sm bg-white"
              style={{ height: h, opacity: 0.4 + i * 0.2 }}
            />
          ))}
        </div>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="11" r="1.5" fill="white" />
          <path
            d="M4.5 7.5C5.5 6.5 6.7 5.9 8 5.9s2.5.6 3.5 1.6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1.5 5C3.2 3.3 5.5 2.2 8 2.2s4.8 1.1 6.5 2.8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="3.5"
            stroke="white"
            strokeOpacity="0.35"
          />
          <rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="white" />
          <path d="M23.5 4v4a2 2 0 000-4z" fill="white" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
