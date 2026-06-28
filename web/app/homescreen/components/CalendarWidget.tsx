import react from "react";

interface CalendarEvent {
  title: string;
  time: string;
  color: string;
}

interface CalendarWidgetProps {
  month?: string;
  dayNumber?: number;
  dayName?: string;
  dotColors?: string[];
  events?: CalendarEvent[];
}

export function CalendarWidget({
  month = "June",
  dayNumber = 28,
  dayName = "Sunday",
  dotColors = ["#FF453A", "#0A84FF", "#30D158"],
  events = [
    { title: "Team Standup", time: "9:00 AM", color: "#FF453A" },
    { title: "Design Review", time: "2:00 PM", color: "#0A84FF" },
  ],
}: CalendarWidgetProps) {
  return (
    <div
      className="relative flex-1 h-36 rounded-[26px] overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.13)",
        border: "0.5px solid rgba(255,255,255,0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="absolute inset-0 rounded-[26px] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.01) 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[26px] pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
        }}
      />
      <div className="relative z-[3] w-full h-full p-4 flex flex-col justify-between text-white">
        <div>
          <p className="text-[10px] uppercase font-semibold tracking-widest opacity-70">
            {month}
          </p>
          <div
            className="text-[44px] font-thin leading-none tracking-[-2px]"
            style={{ color: "#FF453A" }}
          >
            {dayNumber}
          </div>
          <p className="text-[10px] font-semibold opacity-60 tracking-[0.04em]">
            {dayName}
          </p>
          <div className="flex gap-[3px] mt-1">
            {dotColors.map((c, i) => (
              <div
                key={i}
                className="w-[5px] h-[5px] rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[5px]">
          {events.slice(0, 2).map((ev, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="w-[3px] h-7 rounded-sm flex-shrink-0"
                style={{ background: ev.color }}
              />
              <div className="flex flex-col gap-[1px]">
                <span className="text-[10px] font-semibold leading-none">
                  {ev.title}
                </span>
                <span className="text-[9px] opacity-55">{ev.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
