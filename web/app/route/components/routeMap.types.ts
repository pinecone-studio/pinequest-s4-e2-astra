export type Coordinate = [number, number];

export type OverpassElement = {
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: {
    name?: string;
    brand?: string;
    operator?: string;
    "addr:street"?: string;
  };
};

export type GasStation = {
  id: number;
  name: string;
  address?: string;
  center: Coordinate;
  distanceMeters: number;
};

export type RouteLineGeometry = {
  type: "LineString";
  coordinates: Coordinate[];
};

export type DirectionsRoute = {
  distance: number;
  duration: number;
  geometry: RouteLineGeometry;
};
