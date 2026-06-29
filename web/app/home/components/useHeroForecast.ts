"use client";

import { useEffect, useState } from "react";
import type { Forecast } from "./heroTypes";

export function useHeroForecast() {
  const [forecast, setForecast] = useState<Forecast | null>(null);

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setForecast(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    },
    (err) => console.error(err)
  );
}, []);

  return forecast;
}
