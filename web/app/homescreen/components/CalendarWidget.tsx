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
  month = "July",
  dayNumber = 3,
  dayName = "Friday",
  dotColors = ["#FF453A", "#0A84FF", "#30D158"],
  events = [
    { title: "Team Standup", time: "9:00 AM", color: "#FF453A" },
    { title: "Design Review", time: "2:00 PM", color: "#0A84FF" },
  ],
}: CalendarWidgetProps) {
  return (
    <div className="relative h-36 flex-1 overflow-hidden rounded-[26px] bg-[#f8f8f8] shadow-[0_12px_28px_rgba(0,0,0,0.28)] ring-1 ring-white/55">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-black/5 bg-white px-4 pb-2 pt-3">
          <div>
            <p className="text-[12px] font-black uppercase leading-none tracking-[0.12em] text-[#ff3b30]">
              {dayName}
            </p>
            <p className="mt-1 text-[11px] font-semibold text-[#8e8e93]">
              {month}
            </p>
          </div>

          <div className="flex gap-[4px]">
            {dotColors.slice(0, 3).map((color) => (
              <span
                key={color}
                className="h-[6px] w-[6px] rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between bg-white px-4 pb-3 pr-1">
          <div className="text-[58px] font-thin leading-[0.9] tracking-[-0.08em] text-[#1c1c1e]">
            {dayNumber}
          </div>

          <div className="mb-1 flex min-w-0 max-w-[62px] flex-col gap-1">
            {events.slice(0, 2).map((event) => (
              <div key={`${event.title}-${event.time}`} className="flex min-w-0 items-center gap-1.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
                <span className="truncate text-[9px] font-semibold leading-none text-[#3a3a3c]">
                  {event.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
