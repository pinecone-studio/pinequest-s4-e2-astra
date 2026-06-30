import type {
  Coordinate,
  DirectionsRoute,
  MapboxPlaceFeature,
  MapboxTilequeryFeature,
  OverpassElement,
} from "./routeMap.types";
import {
  dedupeTireRepairPlaces,
  isTireRepairTilequeryFeature,
  toMapboxTireRepairPlace,
  toTilequeryTireRepairPlace,
  toTireRepairPlace,
} from "./routeTireRepairMappers";

export type TireRepairPlace = {
  id: string;
  name: string;
  address?: string;
  center: Coordinate;
  distanceMeters: number;
};

export const fetchNearbyTireRepairs = async (
  origin: Coordinate,
  radiusMeters = 5000,
  accessToken?: string,
) => {
  const [overpassPlaces, mapboxPlaces, tilePlaces] = await Promise.all([
    fetchOverpassTireRepairs(origin, radiusMeters).catch(() => []),
    accessToken ? fetchMapboxTireRepairs(origin, accessToken).catch(() => []) : [],
    accessToken
      ? fetchMapboxTilequeryTireRepairs(origin, radiusMeters, accessToken).catch(() => [])
      : [],
  ]);

  return dedupeTireRepairPlaces([...tilePlaces, ...overpassPlaces, ...mapboxPlaces]).sort(
    (first, second) => first.distanceMeters - second.distanceMeters,
  );
};

export const fetchTireRepairDrivingRoute = async (
  origin: Coordinate,
  destination: Coordinate,
  accessToken: string,
) => {
  const params = new URLSearchParams({ access_token: accessToken, geometries: "geojson", overview: "full", steps: "false" });
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?${params.toString()}`,
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { routes?: DirectionsRoute[] };
  return data.routes?.[0] ?? null;
};

const fetchOverpassTireRepairs = async (
  [longitude, latitude]: Coordinate,
  radiusMeters: number,
) => {
  const query = `
    [out:json][timeout:25];
    (
      node["shop"~"tyres|car_repair"](around:${radiusMeters},${latitude},${longitude});
      way["shop"~"tyres|car_repair"](around:${radiusMeters},${latitude},${longitude});
      relation["shop"~"tyres|car_repair"](around:${radiusMeters},${latitude},${longitude});
      node["service:vehicle:tyres"="yes"](around:${radiusMeters},${latitude},${longitude});
      way["service:vehicle:tyres"="yes"](around:${radiusMeters},${latitude},${longitude});
      relation["service:vehicle:tyres"="yes"](around:${radiusMeters},${latitude},${longitude});
    );
    out center 30;
  `;
  const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Tire repair search failed.");
  }

  const data = (await response.json()) as { elements?: OverpassElement[] };

  return (
    data.elements
      ?.map((element) => toTireRepairPlace(element, [longitude, latitude]))
      .filter((place): place is TireRepairPlace => place !== null) ?? []
  );
};

const fetchMapboxTireRepairs = async (origin: Coordinate, accessToken: string) => {
  const [longitude, latitude] = origin;
  const queries = ["tire repair", "tyre repair", "car repair"];
  const responses = await Promise.all(
    queries.map((query) => {
      const params = new URLSearchParams({ access_token: accessToken, proximity: `${longitude},${latitude}`, types: "poi", limit: "10", language: "en" });

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
    .map((feature) => toMapboxTireRepairPlace(feature, origin))
    .filter((place): place is TireRepairPlace => place !== null);
};

const fetchMapboxTilequeryTireRepairs = async (
  origin: Coordinate,
  radiusMeters: number,
  accessToken: string,
) => {
  const [longitude, latitude] = origin;
  const params = new URLSearchParams({ access_token: accessToken, layers: "poi_label", radius: String(Math.min(radiusMeters, 10000)), limit: "50" });
  const response = await fetch(
    `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/${longitude},${latitude}.json?${params.toString()}`,
  );

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as { features?: MapboxTilequeryFeature[] };

  return (
    data.features
      ?.filter(isTireRepairTilequeryFeature)
      .map((feature) => toTilequeryTireRepairPlace(feature, origin))
      .filter((place): place is TireRepairPlace => place !== null) ?? []
  );
};
