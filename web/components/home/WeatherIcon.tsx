type WeatherIconProps = {
  type: "sun" | "heat" | "cloud" | "rain" | "wind";
};

export default function WeatherIcon({
  type,
}: WeatherIconProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center transform scale-[0.75]">
      {type === "cloud" && <span className="weather-cloud" />}

      {type === "rain" && (
        <span className="weather-rain">
          <i />
          <b />
        </span>
      )}

      {type === "wind" && (
        <span className="weather-wind">
          <i />
          <b />
        </span>
      )}

      {(type === "sun" || type === "heat") && (
        <span
          className={
            type === "heat"
              ? "weather-sun heat"
              : "weather-sun"
          }
        />
      )}
    </div>
  );
}

function getWeatherIcon(
  code: number
): "sun" | "cloud" | "rain" | "wind" | "heat" {
  if (code === 0) return "sun";

  if ([1, 2, 3].includes(code)) {
    return "cloud";
  }

  if (
    [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)
  ) {
    return "rain";
  }

  if ([95, 96, 99].includes(code)) {
    return "wind";
  }

  return "cloud";
}