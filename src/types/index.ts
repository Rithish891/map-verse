export interface Location {
  lat: number;
  lng: number;
}

export interface SearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export interface MarkerData {
  id: string;
  position: Location;
  type: "search" | "selected";
  data?: {
    display_name?: string;
    class?: string;
    type?: string;
    importance?: number;
    place_id?: number;
  };
}

export interface MapConfig {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  zoomControl: boolean;
}

export interface GeolocationError {
  code: number;
  message: string;
}
