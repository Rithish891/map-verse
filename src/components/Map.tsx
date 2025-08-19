import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import type { Location, MarkerData, SearchResult } from "../types";
import { reverseGeocode, generateMarkerId } from "../utils";
import { MAP_CONFIG, TILE_LAYER, MARKER_ICONS } from "../constants";
import { useGeolocation } from "../hooks/useGeolocation";
import { SearchBox } from "./SearchBox";
import { LocationDetails } from "./LocationDetails";
import { MapControls } from "./MapControls";
import "./Map.css";

export const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<globalThis.Map<string, L.Marker>>(
    new globalThis.Map()
  );
  const userLocationMarkerRef = useRef<L.Marker | null>(null);

  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const {
    location: userLocation,
    loading: geoLoading,
    refetch: refetchLocation,
  } = useGeolocation();

  const createMarkerIcon = (type: "search" | "selected") => {
    const iconUrl = type === "search" ? MARKER_ICONS.blue : MARKER_ICONS.red;

    return L.icon({
      iconUrl: iconUrl,
      shadowUrl: MARKER_ICONS.shadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  const createUserLocationMarker = (location: Location) => {
    if (!mapInstanceRef.current) return;

    if (userLocationMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userLocationMarkerRef.current);
    }

    const userLocationIcon = L.divIcon({
      className: "user-location-marker",
      html: `<div class="user-location-circle"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    userLocationMarkerRef.current = L.marker([location.lat, location.lng], {
      icon: userLocationIcon,
    }).addTo(mapInstanceRef.current);

    userLocationMarkerRef.current.bindPopup("Your Location").openPopup();
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [userLocation.lat, userLocation.lng],
      zoom: MAP_CONFIG.zoom,
      zoomControl: MAP_CONFIG.zoomControl,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
    });

    L.tileLayer(TILE_LAYER.url, {
      attribution: TILE_LAYER.attribution,
    }).addTo(map);

    map.on("click", async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      await handleMapClick({ lat, lng });
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && !geoLoading) {
      mapInstanceRef.current.setView(
        [userLocation.lat, userLocation.lng],
        MAP_CONFIG.zoom
      );
      createUserLocationMarker(userLocation);
    }
  }, [userLocation, geoLoading]);

  const handleMapClick = async (location: Location) => {
    if (!mapInstanceRef.current) return;

    try {
      const locationData = await reverseGeocode(location);
      const markerId = generateMarkerId();

      const markerData: MarkerData = {
        id: markerId,
        position: location,
        type: "selected",
        data: locationData
          ? {
              display_name: locationData.display_name,
              class: locationData.class,
              type: locationData.type,
              importance: locationData.importance,
              place_id: locationData.place_id,
            }
          : undefined,
      };

      addMarker(markerData);
      setSelectedMarker(markerData);
    } catch (error) {
      console.error("Error handling map click:", error);
    }
  };

  const handleSearchResult = (result: SearchResult) => {
    if (!mapInstanceRef.current) return;

    const location: Location = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };

    const markerId = generateMarkerId();
    const markerData: MarkerData = {
      id: markerId,
      position: location,
      type: "search",
      data: {
        display_name: result.display_name,
        class: result.class,
        type: result.type,
        importance: result.importance,
        place_id: result.place_id,
      },
    };

    mapInstanceRef.current.setView([location.lat, location.lng], 15);

    addMarker(markerData);
    setSelectedMarker(markerData);
  };

  const addMarker = (markerData: MarkerData) => {
    if (!mapInstanceRef.current) return;

    const existingMarker = markersRef.current.get(markerData.id);
    if (existingMarker) {
      mapInstanceRef.current.removeLayer(existingMarker);
    }

    const icon = createMarkerIcon(markerData.type);

    const marker = L.marker(
      [markerData.position.lat, markerData.position.lng],
      { icon }
    ).addTo(mapInstanceRef.current);

    marker.on("click", () => {
      setSelectedMarker(markerData);
    });

    marker.on("dblclick", () => {
      removeMarker(markerData.id);
    });

    markersRef.current.set(markerData.id, marker);
  };

  const removeMarker = (markerId: string) => {
    if (!mapInstanceRef.current) return;

    const marker = markersRef.current.get(markerId);
    if (marker) {
      mapInstanceRef.current.removeLayer(marker);
      markersRef.current.delete(markerId);
    }

    if (selectedMarker && selectedMarker.id === markerId) {
      setSelectedMarker(null);
    }

    if (markersRef.current.size === 0) {
      setSelectedMarker(null);
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleLocateUser = async () => {
    setLocationLoading(true);
    try {
      await refetchLocation();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView(
          [userLocation.lat, userLocation.lng],
          MAP_CONFIG.zoom
        );
        createUserLocationMarker(userLocation);
      }
    } catch (error) {
      console.error("Error locating user:", error);
    } finally {
      setLocationLoading(false);
    }
  };

  const closeLocationDetails = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <SearchBox onSelectLocation={handleSearchResult} />
      </div>

      <div ref={mapRef} className="map" />

      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onLocateUser={handleLocateUser}
        loading={locationLoading}
      />

      <LocationDetails marker={selectedMarker} onClose={closeLocationDetails} />
    </div>
  );
};
