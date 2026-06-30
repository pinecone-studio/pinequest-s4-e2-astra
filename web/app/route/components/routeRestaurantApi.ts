import type {
  Coordinate,
  DirectionsRoute,
  MapboxPlaceFeature,
  MapboxTilequeryFeature,
  OverpassElement,
} from "./routeMap.types";
import {
  dedupeRestaurants,
  isRestaurantTilequeryFeature,
  toMapboxRestaurant,
  toRestaurant,
  toTilequeryRestaurant,
} from "./routeRestaurantMappers";

export type RestaurantPlace = {
  id: string;
  name: string;
  address?: string;
  center: Coordinate;
  distanceMeters: number;
};

export const fetchNearbyRestaurants = async (
  origin: Coordinate,
  radiusMeters = 5000,
  accessToken?: string,
) => {
  const [overpassRestaurants, mapboxRestaurants, mapboxTileRestaurants] =
    await Promise.all([
      fetchOverpassRestaurants(origin, radiusMeters).catch(() => []),
      accessToken ? fetchMapboxRestaurants(origin, accessToken).catch(() => []) : [],
      accessToken
        ? fetchMapboxTilequeryRestaurants(origin, radiusMeters, accessToken).catch(() => [])
        : [],
    ]);

  return dedupeRestaurants([
    ...mapboxTileRestaurants,
    ...overpassRestaurants,
    ...mapboxRestaurants,
  ]).sort((first, second) => first.distanceMeters - second.distanceMeters);
};

export const fetchRestaurantDrivingRoute = async (
  origin: Coordinate,
  destination: Coordinate,
  accessToken: string,
) => {
  const params = new URLSearchParams({
    access_token: accessToken,
    geometries: "geojson",
    overview: "full",
    steps: "false",
  });
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?${params.toString()}`,
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { routes?: DirectionsRoute[] };
  return data.routes?.[0] ?? null;
};

const fetchOverpassRestaurants = async (
  [longitude, latitude]: Coordinate,
  radiusMeters: number,
) => {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"restaurant|cafe|fast_food|food_court"](around:${radiusMeters},${latitude},${longitude});
      way["amenity"~"restaurant|cafe|fast_food|food_court"](around:${radiusMeters},${latitude},${longitude});
      relation["amenity"~"restaurant|cafe|fast_food|food_court"](around:${radiusMeters},${latitude},${longitude});
    );
    out center 30;
  `;
  const response = await fetch(
    `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Restaurant search failed.");
  }

  const data = (await response.json()) as { elements?: OverpassElement[] };

  return (
    data.elements
      ?.map((element) => toRestaurant(element, [longitude, latitude]))
      .filter((place): place is RestaurantPlace => place !== null) ?? []
  );
};

const fetchMapboxRestaurants = async (origin: Coordinate, accessToken: string) => {
  const [longitude, latitude] = origin;
  const queries = ["restaurant", "cafe", "fast food"];
  const responses = await Promise.all(
    queries.map((query) => {
      const params = new URLSearchParams({
        access_token: accessToken,
        proximity: `${longitude},${latitude}`,
        types: "poi",
        limit: "10",
        language: "en",
      });

      return fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?${params.toString()}`,
      );
    }),
  );
  const payloads = await Promise.all(
    responses.filter((response) => response.ok).map((response) => response.json()),
  );
  const features = payloads.flatMap(
    (payload: { features?: MapboxPlaceFeature[] }) => payload.features ?? [],
  );

  return features
    .map((feature) => toMapboxRestaurant(feature, origin))
    .filter((place): place is RestaurantPlace => place !== null);
};

const fetchMapboxTilequeryRestaurants = async (
  origin: Coordinate,
  radiusMeters: number,
  accessToken: string,
) => {
  const [longitude, latitude] = origin;
  const params = new URLSearchParams({
    access_token: accessToken,
    layers: "poi_label",
    radius: String(Math.min(radiusMeters, 10000)),
    limit: "50",
  });
  const response = await fetch(
    `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/${longitude},${latitude}.json?${params.toString()}`,
  );

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as { features?: MapboxTilequeryFeature[] };

  return (
    data.features
      ?.filter(isRestaurantTilequeryFeature)
      .map((feature) => toTilequeryRestaurant(feature, origin))
      .filter((place): place is RestaurantPlace => place !== null) ?? []
  );
};
