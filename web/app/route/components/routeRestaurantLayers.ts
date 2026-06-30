import mapboxgl from "mapbox-gl";
import type { Coordinate, RouteLineGeometry } from "./routeMap.types";
import type { RestaurantPlace } from "./routeRestaurantApi";

const restaurantRouteSourceId = "nearest-restaurant-route";
const restaurantRouteLayerId = "nearest-restaurant-route";

export const clearRestaurantRoute = (
  map: mapboxgl.Map,
  markers: mapboxgl.Marker[],
) => {
  markers.forEach((marker) => marker.remove());

  if (map.getLayer(restaurantRouteLayerId)) {
    map.removeLayer(restaurantRouteLayerId);
  }

  if (map.getSource(restaurantRouteSourceId)) {
    map.removeSource(restaurantRouteSourceId);
  }
};

export const drawNearestRestaurantRoute = (
  map: mapboxgl.Map,
  origin: Coordinate,
  restaurant: RestaurantPlace,
  geometry: RouteLineGeometry,
) => {
  map.addSource(restaurantRouteSourceId, {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry,
    },
  });

  map.addLayer({
    id: restaurantRouteLayerId,
    type: "line",
    source: restaurantRouteSourceId,
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#f59e0b",
      "line-width": 5,
      "line-opacity": 0.92,
    },
  });

  const popup = new mapboxgl.Popup({ offset: 24 }).setText(
    restaurant.address
      ? `${restaurant.name} - ${restaurant.address}`
      : restaurant.name,
  );
  const marker = new mapboxgl.Marker({ color: "#f59e0b" })
    .setLngLat(restaurant.center)
    .setPopup(popup)
    .addTo(map);

  fitRestaurantGeometry(map, origin, geometry);
  return marker;
};

const fitRestaurantGeometry = (
  map: mapboxgl.Map,
  origin: Coordinate,
  geometry: RouteLineGeometry,
) => {
  const bounds = geometry.coordinates.reduce(
    (routeBounds, coordinate) => routeBounds.extend(coordinate as Coordinate),
    new mapboxgl.LngLatBounds(origin, origin),
  );

  map.fitBounds(bounds, {
    padding: { top: 120, right: 42, bottom: 130, left: 88 },
    maxZoom: 16,
    duration: 900,
  });
};
