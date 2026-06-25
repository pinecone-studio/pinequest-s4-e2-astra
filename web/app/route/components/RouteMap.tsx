"use client";

import mapboxgl from "mapbox-gl";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const fallbackPoint = [106.9176, 47.9188] as [number, number];
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function RouteMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [locationStatus, setLocationStatus] = useState("Finding your location...");

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !accessToken) {
      return;
    }

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: fallbackPoint,
      zoom: 14,
      pitch: 30,
      attributionControl: false,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

    let watchId: number | undefined;

    const updateLocation = ({ coords }: GeolocationPosition) => {
      const currentPoint = [coords.longitude, coords.latitude] as [number, number];

      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker({ color: "#2563eb" })
          .setLngLat(currentPoint)
          .addTo(map);
      } else {
        markerRef.current.setLngLat(currentPoint);
      }

      const accuracyData = {
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "Point" as const,
          coordinates: currentPoint,
        },
      };

      const accuracySource = map.getSource("location-accuracy") as
        | mapboxgl.GeoJSONSource
        | undefined;

      if (accuracySource) {
        accuracySource.setData(accuracyData);
      } else {
        map.addSource("location-accuracy", {
          type: "geojson",
          data: accuracyData,
        });

        map.addLayer({
          id: "location-accuracy",
          type: "circle",
          source: "location-accuracy",
          paint: {
            "circle-radius": Math.min(Math.max(coords.accuracy / 8, 18), 70),
            "circle-color": "#2563eb",
            "circle-opacity": 0.14,
            "circle-stroke-color": "#2563eb",
            "circle-stroke-opacity": 0.3,
            "circle-stroke-width": 1,
          },
        });
      }

      map.easeTo({
        center: currentPoint,
        zoom: Math.max(map.getZoom(), 15),
        duration: 700,
      });

      setLocationStatus("Showing your live location.");
    };

    const watchLocation = () => {
      if (!navigator.geolocation) {
        setLocationStatus("Location is not supported by this browser.");
        return;
      }

      watchId = navigator.geolocation.watchPosition(
        updateLocation,
        () => {
          setLocationStatus("Allow location permission to show your exact position.");
          map.easeTo({ center: fallbackPoint, zoom: 14, duration: 0 });
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000,
        },
      );
    };

    map.on("load", watchLocation);

    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }

      markerRef.current?.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-slate-100">
      {accessToken ? (
        <div ref={mapContainerRef} className="h-full w-full" />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-8 text-center text-sm font-medium text-slate-500">
          Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to show the Mapbox map.
        </div>
      )}

      <Link
        href="/"
        aria-label="Back to home"
        className="absolute left-6 top-7 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg backdrop-blur transition hover:bg-white active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
      </Link>

      <div className="absolute left-4 right-4 top-14 z-10 rounded-[1.4rem] bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
        <p className="text-[10px] font-semibold uppercase text-slate-500">
          Live Location
        </p>
        <p className="text-sm font-semibold text-slate-900">Your current position</p>
        <p className="mt-1 text-[11px] font-medium text-slate-500">{locationStatus}</p>
      </div>
    </div>
  );
}
