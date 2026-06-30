import type {
  Coordinate,
  MapboxPlaceFeature,
  MapboxTilequeryFeature,
  OverpassElement,
} from "./routeMap.types";
import { getDistanceMeters } from "./routeMapUtils";
import type { TireRepairPlace } from "./routeTireRepairApi";

export const toTireRepairPlace = (
  element: OverpassElement,
  origin: Coordinate,
): TireRepairPlace | null => {
  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;

  if (lat === undefined || lon === undefined) {
    return null;
  }

  return {
    id: `osm-tire-${element.id}`,
    name: element.tags?.name ?? element.tags?.brand ?? element.tags?.operator ?? "Tire repair",
    address: element.tags?.["addr:street"],
    center: [lon, lat],
    distanceMeters: getDistanceMeters(origin, [lon, lat]),
  };
};

export const toMapboxTireRepairPlace = (
  feature: MapboxPlaceFeature,
  origin: Coordinate,
): TireRepairPlace | null => {
  if (!feature.center) {
    return null;
  }

  return {
    id: `mapbox-tire-${feature.id}`,
    name: feature.text ?? "Tire repair",
    address: feature.place_name,
    center: feature.center,
    distanceMeters: getDistanceMeters(origin, feature.center),
  };
};

export const toTilequeryTireRepairPlace = (
  feature: MapboxTilequeryFeature,
  origin: Coordinate,
): TireRepairPlace | null => {
  const center = feature.geometry?.coordinates;

  if (!center) {
    return null;
  }

  return {
    id: `tile-tire-${feature.id ?? center.join(",")}`,
    name: feature.properties?.name ?? "Tire repair",
    center,
    distanceMeters: getDistanceMeters(origin, center),
  };
};

export const isTireRepairTilequeryFeature = (feature: MapboxTilequeryFeature) => {
  const properties = feature.properties;
  const label = [
    properties?.name,
    properties?.maki,
    properties?.class,
    properties?.type,
    properties?.category_en,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    label.includes("tire") ||
    label.includes("tyre") ||
    label.includes("car repair") ||
    label.includes("auto repair") ||
    label.includes("mechanic")
  );
};

export const dedupeTireRepairPlaces = (places: TireRepairPlace[]) => {
  const uniquePlaces: TireRepairPlace[] = [];

  places.forEach((place) => {
    const duplicate = uniquePlaces.some(
      (existingPlace) => getDistanceMeters(existingPlace.center, place.center) < 80,
    );

    if (!duplicate) {
      uniquePlaces.push(place);
    }
  });

  return uniquePlaces;
};
