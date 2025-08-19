import React from "react";
import type { MarkerData } from "../types";
import "./LocationDetails.css";

interface LocationDetailsProps {
  marker: MarkerData | null;
  onClose: () => void;
}

export const LocationDetails: React.FC<LocationDetailsProps> = ({
  marker,
  onClose,
}) => {
  if (!marker) return null;

  const formatCoordinate = (coord: number) => coord.toFixed(6);

  return (
    <div className="location-details">
      <div className="location-details-header">
        <h3>Location Details</h3>
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <div className="location-details-content">
        <div className="detail-row">
          <span className="detail-label">Type:</span>
          <span
            className={`detail-value marker-type ${
              marker.type === "search" ? "search-marker" : "selected-marker"
            }`}
          >
            {marker.type === "search" ? "Search Result" : "Selected Location"}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Latitude:</span>
          <span className="detail-value">
            {formatCoordinate(marker.position.lat)}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Longitude:</span>
          <span className="detail-value">
            {formatCoordinate(marker.position.lng)}
          </span>
        </div>

        {marker.data?.display_name && (
          <div className="detail-row">
            <span className="detail-label">Address:</span>
            <span className="detail-value">{marker.data.display_name}</span>
          </div>
        )}

        {marker.data?.class && (
          <div className="detail-row">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{marker.data.class}</span>
          </div>
        )}

        {marker.data?.type && (
          <div className="detail-row">
            <span className="detail-label">Type:</span>
            <span className="detail-value">{marker.data.type}</span>
          </div>
        )}

        {marker.data?.place_id && (
          <div className="detail-row">
            <span className="detail-label">Place ID:</span>
            <span className="detail-value">{marker.data.place_id}</span>
          </div>
        )}
      </div>
    </div>
  );
};
