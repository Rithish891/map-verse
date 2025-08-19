import React from "react";
import "./MapControls.css";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocateUser: () => void;
  loading?: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onLocateUser,
  loading = false,
}) => {
  return (
    <div className="map-controls">
      <button
        className="control-button zoom-in"
        onClick={onZoomIn}
        aria-label="Zoom in"
        title="Zoom in"
      >
        +
      </button>

      <button
        className="control-button zoom-out"
        onClick={onZoomOut}
        aria-label="Zoom out"
        title="Zoom out"
      >
        −
      </button>

      <button
        className={`control-button locate-user ${loading ? "loading" : ""}`}
        onClick={onLocateUser}
        disabled={loading}
        aria-label="Show your location"
        title="Show your location"
      >
        {loading ? (
          <div className="loading-spinner" />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L18.5 7C17.9 4.8 16.2 3.1 14 2.5V1H10V2.5C7.8 3.1 6.1 4.8 5.5 7H3V9H5.5C6.1 11.2 7.8 12.9 10 13.5V22H14V13.5C16.2 12.9 17.9 11.2 18.5 9H21ZM12 8C13.7 8 15 9.3 15 11S13.7 14 12 14 9 12.7 9 11 10.3 8 12 8Z" />
          </svg>
        )}
      </button>
    </div>
  );
};
