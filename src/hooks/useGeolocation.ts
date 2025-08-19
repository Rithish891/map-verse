import { useState, useEffect } from "react";
import type { Location, GeolocationError } from "../types";
import { getCurrentLocation } from "../utils";
import { DEFAULT_LOCATION } from "../constants";

interface UseGeolocationReturn {
  location: Location;
  error: GeolocationError | null;
  loading: boolean;
  refetch: () => void;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
    } catch (err) {
      const geolocationError: GeolocationError = {
        code: err instanceof GeolocationPositionError ? err.code : 0,
        message:
          err instanceof Error ? err.message : "Unknown geolocation error",
      };
      setError(geolocationError);
      setLocation(DEFAULT_LOCATION);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return {
    location,
    error,
    loading,
    refetch: fetchLocation,
  };
};
