"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import RouteChecklistModal from "./RouteChecklistModal";
import RouteMapControls from "./RouteMapControls";
import { updateLiveLocation } from "./routeMapLayers";
import { fetchTripDestinations, fetchRouteCoordinates } from "./routeMapApi";
import {
  clearAllRoutes,
  findNearestGasStation,
  findNearestRestaurant,
  findNearestTireRepair,
} from "./routeMapSearchActions";
import type { Coordinate } from "./routeMap.types";
import { fallbackPoint } from "./routeMapUtils";

// Mapbox CSS-ийг заавал энд импортлно (Энэ байхгүй бол шугам харахгүй эвдэрдэг)
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface RouteMapProps {
  tripId?: string;
}

export default function RouteMap({ tripId }: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const locationMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const currentPointRef = useRef<Coordinate>(fallbackPoint);
  const gasMarkersRef = useRef<mapboxgl.Marker[]>([]);
  const restaurantMarkersRef = useRef<mapboxgl.Marker[]>([]);
  const tireRepairMarkersRef = useRef<mapboxgl.Marker[]>([]);
  const [isFindingGasStation, setIsFindingGasStation] = useState(false);
  const [isFindingRestaurant, setIsFindingRestaurant] = useState(false);
  const [isFindingTireRepair, setIsFindingTireRepair] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [gasStationStatus, setGasStationStatus] = useState("");

  // 🆕 Газрын зураг бэлэн болсон эсэхийг хянах flag.
  // Refs өөрчлөгдөхөд useEffect дахин ажилладаггүй тул state ашиглах шаардлагатай.
  const [isMapReady, setIsMapReady] = useState(false);

  // Баазаас координат авч, Marshrut API-аар дамжуулан навигацийн зам зурах useEffect
  useEffect(() => {
    // 🆕 mapRef.current шалгахын оронд isMapReady ашиглав — учир нь
    // энэ effect эхлээд ажиллах үед mapRef.current бэлэн бус байсан.
    if (!tripId || !mapRef.current || !isMapReady) return;

    async function drawTripRoute() {
      try {
        if (!mapRef.current) return;
        setGasStationStatus("Маршрут тооцоолж байна...");

        // 1. Баазаас цэгүүдийг унших (! тэмдгээр TypeScript алдааг засав)
        const destinations = await fetchTripDestinations(tripId!);

        // 2. Marshrut API-аас машины жинхэнэ замын координатыг авах
        const coordinates = await fetchRouteCoordinates(destinations);

        const map = mapRef.current;

        // Mapbox-ийн стиль бүрэн ачаалагдсан эсэхийг шалгаж, хүлээж байж шугамаа зурна
        if (!map.isStyleLoaded()) {
          map.once("style.load", () => {
            renderRouteLine(map, coordinates);
          });
        } else {
          renderRouteLine(map, coordinates);
        }

        setGasStationStatus("Маршрут амжилттай зурагдлаа.");
      } catch (err: any) {
        console.error("Маршрут зурахад алдаа гарлаа:", err);
        setGasStationStatus(err.message || "Маршрут зурж чадсангүй.");
      }
    }

    // Mapbox дээр цэнхэр шугам зурж, камерыг аяллын бүх цэг харагдахаар тааруулах функц
    function renderRouteLine(map: mapboxgl.Map, coordinates: any) {
      if (!coordinates || coordinates.length === 0) return;

      if (map.getLayer("route-layer")) map.removeLayer("route-layer");
      if (map.getSource("route-source")) map.removeSource("route-source");

      map.addSource("route-source", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      });

      map.addLayer({
        id: "route-layer",
        type: "line",
        source: "route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#38bdf8", "line-width": 6 }, // Аяллын цэнхэр шугам
      });

      // БҮХ ЦЭГИЙГ БАГТААСАН ХИЛИЙГ ТОГТООХ
      const bounds = new mapboxgl.LngLatBounds(
        coordinates[0] as [number, number],
        coordinates[0] as [number, number]
      );

      for (const coord of coordinates) {
        bounds.extend(coord as [number, number]);
      }

      // 🌟 КАМЕРЫГ АЯЛЛЫН ТЭВ РҮҮ АВТОМАТААР ШИЛЖҮҮЛЭХ МӨР (Заавал байх шаардлагатай)
      map.fitBounds(bounds, {
        padding: 80, // Ирмэгээс авах зай (pixel)
        maxZoom: 12,
        duration: 2000 // 2 секундын гоё шилжилт
      });
    }

    drawTripRoute();
  }, [tripId, isMapReady]); // 🆕 isMapReady-г dependency-д нэмэв

  // Хэрэглэгчийн live байршлыг хянах үндсэн useEffect
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !accessToken) return;
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
    let watchId: number | undefined;

    map.on("load", () => {
      setIsMapReady(true); // 🆕 газрын зураг бэлэн боллоо гэдгийг дохих

      if (!navigator.geolocation) return;
      watchId = navigator.geolocation.watchPosition(
        ({ coords }) => {
          const point = [coords.longitude, coords.latitude] as Coordinate;
          currentPointRef.current = point;
          updateLiveLocation(map, locationMarkerRef, point, coords.accuracy);
        },
        () => {
          map.easeTo({ center: fallbackPoint, zoom: 14, duration: 0 });
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 },
      );
    });

    return () => {
      if (watchId !== undefined) navigator.geolocation.clearWatch(watchId);
      clearAllRoutes(map, { gas: gasMarkersRef, restaurant: restaurantMarkersRef, tireRepair: tireRepairMarkersRef });
      locationMarkerRef.current?.remove();
      map.remove();
      mapRef.current = null;
      setIsMapReady(false); // 🆕 цэвэрлэхдээ мөн false болгоно
    };
  }, []);

  const handleFindGasStation = async () => {
    if (!mapRef.current || !accessToken || isFindingGasStation) return;
    setIsFindingGasStation(true);
    try { await findNearestGasStation(getSearchContext()); } catch { } finally { setIsFindingGasStation(false); }
  };

  const handleFindRestaurant = async () => {
    if (!mapRef.current || !accessToken || isFindingRestaurant) return;
    setIsFindingRestaurant(true);
    try { await findNearestRestaurant(getSearchContext()); } catch { } finally { setIsFindingRestaurant(false); }
  };

  const handleFindTireRepair = async () => {
    if (!mapRef.current || !accessToken || isFindingTireRepair) return;
    setIsFindingTireRepair(true);
    try { await findNearestTireRepair(getSearchContext()); } catch { } finally { setIsFindingTireRepair(false); }
  };

  const handleRecenterLocation = () => {
    mapRef.current?.easeTo({ center: currentPointRef.current, zoom: Math.max(mapRef.current.getZoom(), 15), duration: 700 });
  };

  const getSearchContext = () => ({
    accessToken: accessToken as string,
    map: mapRef.current as mapboxgl.Map,
    markerRefs: { gas: gasMarkersRef, restaurant: restaurantMarkersRef, tireRepair: tireRepairMarkersRef },
    origin: currentPointRef.current,
    setStatus: setGasStationStatus,
  });

  return (
    <div className="relative h-full w-full bg-slate-100">
      {accessToken ? <div ref={mapContainerRef} className="h-full w-full" /> : <div className="flex h-full w-full items-center justify-center text-slate-500">Add Token</div>}
      <RouteMapControls
        gasStationStatus={gasStationStatus}
        isFindingGasStation={isFindingGasStation}
        isFindingRestaurant={isFindingRestaurant}
        isFindingTireRepair={isFindingTireRepair}
        onFindGasStation={handleFindGasStation}
        onFindRestaurant={handleFindRestaurant}
        onFindTireRepair={handleFindTireRepair}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onRecenterLocation={handleRecenterLocation}
      />
      {isChecklistOpen && <RouteChecklistModal onClose={() => setIsChecklistOpen(false)} />}
    </div>
  );
}