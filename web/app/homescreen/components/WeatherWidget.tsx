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
  temp = 23,
  condition = "Mostly Cloudy",
  high = 23,
  low = 13,
}: WeatherWidgetProps) {
  return (
    <div className="relative h-36 flex-1 overflow-hidden rounded-[26px] bg-gradient-to-b from-[#1f8cff] via-[#4bb3ff] to-[#7ad7ff] p-4 text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)] ring-1 ring-white/45">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.38),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.16),transparent_45%)]" />
      {/* <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-[#ffd54a] shadow-[0_0_24px_rgba(255,213,74,0.65)]" /> */}
      <div className="absolute right-8 top-12 h-8 w-16 rounded-full bg-white/90 shadow-sm" />
      <div className="absolute right-4 top-[60px] h-7 w-12 rounded-full bg-white/95 shadow-sm" />
      <div className="absolute right-[52px] top-10 h-9 w-9 rounded-full bg-white/90 shadow-sm" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <p className="text-[13px] font-semibold leading-none drop-shadow-sm">
            {city}
          </p>
          <p className="mt-1 text-[10px] font-medium text-white/75">
            {condition}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div className="text-[58px] font-thin leading-[0.84] tracking-[-0.08em] drop-shadow-sm flex">
            {temp}
            <sup className="text-[24px] font-light tracking-normal flex top-2 left-1">°</sup>
          </div>
          <p className="pb-1 text-right text-[11px] font-semibold leading-tight text-white/82">
            H:{high}°<br />
            L:{low}°
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
