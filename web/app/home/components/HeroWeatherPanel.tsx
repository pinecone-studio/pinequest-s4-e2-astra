import WeatherIcon from "@/components/home/WeatherIcon";
import type { Forecast } from "./heroTypes";
import { getWeatherType } from "./heroWeather";

type HeroWeatherPanelProps = {
  forecast: Forecast | null;
};

export default function HeroWeatherPanel({ forecast }: HeroWeatherPanelProps) {
  const todayCode = forecast?.daily?.weathercode?.[0] ?? 0;
  const todayTemperature = forecast?.daily?.temperature_2m_max?.[0];

  return (
    <>
      <section className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/50 to-white py-2.5 px-4 shadow-md shadow-sky-950/5">
        <div className="flex items-center justify-between gap-2">
 
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-[1rem] bg-white shadow-sm ring-1 ring-sky-100">
              <WeatherIcon type={getWeatherType(todayCode)} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1b9bd7] leading-none mb-0.5">
                Цаг агаар
              </p>
              <h2 className="text-sm font-black text-slate-950 leading-none">Өнөөдөр</h2>
            </div>
          </div>

          <div>
            <p className="text-3xl font-black text-slate-950 tracking-tighter">
              {todayTemperature === undefined ? "--" : Math.round(todayTemperature)}°
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-[#1b9bd7] p-5 text-white shadow-xl shadow-sky-950/10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-wide">7 хоногийн төлөв</h2>
        </div>
        
        <div className="scrollbar-invisible -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {forecast?.daily?.time?.map((date, index) => (
            <div
              key={date}
              className="w-[4.8rem] flex-shrink-0 rounded-[1.75rem] bg-white/15 px-2 py-4 text-center backdrop-blur-sm"
            >
              <p className="text-sm font-bold text-white mb-2">
                {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              
              <div className="my-2 flex h-6 w-full items-center justify-center">
                <WeatherIcon type={getWeatherType(forecast.daily?.weathercode?.[index] ?? 0)} />
              </div>
              
              <p className="text-base font-black text-white">
                {Math.round(forecast.daily?.temperature_2m_max?.[index] ?? 0)}°
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}