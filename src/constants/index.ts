import type { MapConfig } from "../types";

export const DEFAULT_LOCATION = {
  lat: 40.7128,
  lng: -74.006,
};

export const MAP_CONFIG: MapConfig = {
  zoom: 13,
  minZoom: 3,
  maxZoom: 18,
  zoomControl: false,
};

export const TILE_LAYER = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: "© OpenStreetMap contributors",
};

export const NOMINATIM_API = {
  baseUrl: "https://nominatim.openstreetmap.org",
  searchEndpoint: "/search",
  reverseEndpoint: "/reverse",
  format: "json",
  limit: 5,
};

export const MARKER_COLORS = {
  search: "#007bff",
  selected: "#dc3545",
};

export const MARKER_ICONS = {
  blue: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  red: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadow:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
};

export const DEBOUNCE_DELAY = 300;

export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000,
};
