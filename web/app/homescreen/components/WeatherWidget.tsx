import react from "react";
interface WeatherWidgetProps {
  city?: string;
  temp?: number;
  condition?: string;
  conditionIcon?: string;
  high?: number;
  low?: number;
}

export function WeatherWidget({
  city = "Ulaanbaatar",
  temp = 20,
  condition = "Mostly Cloudy",
  conditionIcon = "🌤",
  high = 22,
  low = 12,
}: WeatherWidgetProps) {
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
          <p className="text-[10px] uppercase font-semibold tracking-widest opacity-70 flex items-center gap-1">
            <span className="text-[11px]">{conditionIcon}</span>
            Weather
          </p>
          <h3 className="text-[15px] font-semibold mt-0.5 tracking-tight">
            {city}
          </h3>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-[46px] font-thin leading-none tracking-[-3px]">
            {temp}
            <sup className="text-base font-light align-super tracking-normal">
              °
            </sup>
          </span>
          <div className="flex flex-col items-end gap-0.5 pb-0.5">
            <span className="text-[11px] font-medium opacity-85">
              {condition}
            </span>
            <span className="text-[10px] opacity-60">
              H:{high}° L:{low}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeatherWidget;
