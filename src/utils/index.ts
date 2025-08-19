import type { Location, SearchResult } from "../types";
import { NOMINATIM_API } from "../constants";

export const searchPlaces = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];

  try {
    const params = new URLSearchParams({
      q: query,
      format: NOMINATIM_API.format,
      limit: NOMINATIM_API.limit.toString(),
      addressdetails: "1",
      extratags: "1",
    });

    const response = await fetch(
      `${NOMINATIM_API.baseUrl}${NOMINATIM_API.searchEndpoint}?${params}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching places:", error);
    return [];
  }
};

export const reverseGeocode = async (
  location: Location
): Promise<SearchResult | null> => {
  try {
    const params = new URLSearchParams({
      lat: location.lat.toString(),
      lon: location.lng.toString(),
      format: NOMINATIM_API.format,
      addressdetails: "1",
      extratags: "1",
    });

    const response = await fetch(
      `${NOMINATIM_API.baseUrl}${NOMINATIM_API.reverseEndpoint}?${params}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return null;
  }
};

export const getCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const generateMarkerId = (): string => {
  return `marker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
