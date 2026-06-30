import type {
  Coordinate,
  MapboxPlaceFeature,
  MapboxTilequeryFeature,
  OverpassElement,
} from "./routeMap.types";
import { getDistanceMeters } from "./routeMapUtils";
import type { RestaurantPlace } from "./routeRestaurantApi";

export const toRestaurant = (
  element: OverpassElement,
  origin: Coordinate,
): RestaurantPlace | null => {
  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;

  if (lat === undefined || lon === undefined) {
    return null;
  }

  return {
    id: `osm-food-${element.id}`,
    name: element.tags?.name ?? element.tags?.brand ?? element.tags?.operator ?? "Restaurant",
    address: element.tags?.["addr:street"],
    center: [lon, lat],
    distanceMeters: getDistanceMeters(origin, [lon, lat]),
  };
};

export const toMapboxRestaurant = (
  feature: MapboxPlaceFeature,
  origin: Coordinate,
): RestaurantPlace | null => {
  if (!feature.center) {
    return null;
  }

  return {
    id: `mapbox-food-${feature.id}`,
    name: feature.text ?? "Restaurant",
    address: feature.place_name,
    center: feature.center,
    distanceMeters: getDistanceMeters(origin, feature.center),
  };
};

export const toTilequeryRestaurant = (
  feature: MapboxTilequeryFeature,
  origin: Coordinate,
): RestaurantPlace | null => {
  const center = feature.geometry?.coordinates;

  if (!center) {
    return null;
  }

  return {
    id: `tile-food-${feature.id ?? center.join(",")}`,
    name: feature.properties?.name ?? "Restaurant",
    center,
    distanceMeters: getDistanceMeters(origin, center),
  };
};

export const isRestaurantTilequeryFeature = (feature: MapboxTilequeryFeature) => {
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
    properties?.maki === "restaurant" ||
    properties?.maki === "cafe" ||
    label.includes("restaurant") ||
    label.includes("cafe") ||
    label.includes("fast food") ||
    label.includes("food")
  );
};

export const dedupeRestaurants = (places: RestaurantPlace[]) => {
  const uniquePlaces: RestaurantPlace[] = [];

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
