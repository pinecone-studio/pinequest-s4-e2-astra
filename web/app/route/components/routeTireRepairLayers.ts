import mapboxgl from "mapbox-gl";
import type { Coordinate, RouteLineGeometry } from "./routeMap.types";
import type { TireRepairPlace } from "./routeTireRepairApi";

const tireRepairRouteSourceId = "nearest-tire-repair-route";
const tireRepairRouteLayerId = "nearest-tire-repair-route";

export const clearTireRepairRoute = (
  map: mapboxgl.Map,
  markers: mapboxgl.Marker[],
) => {
  markers.forEach((marker) => marker.remove());

  if (map.getLayer(tireRepairRouteLayerId)) {
    map.removeLayer(tireRepairRouteLayerId);
  }

  if (map.getSource(tireRepairRouteSourceId)) {
    map.removeSource(tireRepairRouteSourceId);
  }
};

export const drawNearestTireRepairRoute = (
  map: mapboxgl.Map,
  origin: Coordinate,
  place: TireRepairPlace,
  geometry: RouteLineGeometry,
) => {
  map.addSource(tireRepairRouteSourceId, {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry,
    },
  });

  map.addLayer({
    id: tireRepairRouteLayerId,
    type: "line",
    source: tireRepairRouteSourceId,
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#8b5cf6",
      "line-width": 5,
      "line-opacity": 0.92,
    },
  });

  const popup = new mapboxgl.Popup({ offset: 24 }).setText(
    place.address ? `${place.name} - ${place.address}` : place.name,
  );
  const marker = new mapboxgl.Marker({ color: "#8b5cf6" })
    .setLngLat(place.center)
    .setPopup(popup)
    .addTo(map);

  fitTireRepairGeometry(map, origin, geometry);
  return marker;
};

const fitTireRepairGeometry = (
  map: mapboxgl.Map,
  origin: Coordinate,
  geometry: RouteLineGeometry,
) => {
  const bounds = geometry.coordinates.reduce(
    (routeBounds, coordinate) => routeBounds.extend(coordinate as Coordinate),
    new mapboxgl.LngLatBounds(origin, origin),
  );

  map.fitBounds(bounds, {
    padding: { top: 130, right: 42, bottom: 130, left: 88 },
    maxZoom: 16,
    duration: 900,
  });
};
