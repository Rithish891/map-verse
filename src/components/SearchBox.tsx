import React, { useState, useCallback } from "react";
import type { SearchResult } from "../types";
import { searchPlaces, debounce } from "../utils";
import { DEBOUNCE_DELAY } from "../constants";
import "./SearchBox.css";

interface SearchBoxProps {
  onSelectLocation: (result: SearchResult) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchPlaces(searchQuery);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSelectSuggestion = (result: SearchResult) => {
    setQuery(result.display_name);
    setShowSuggestions(false);
    setSuggestions([]);
    onSelectLocation(result);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="search-box">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder="Search for a location..."
          className="search-input"
        />
        {loading && <div className="search-loading">Searching...</div>}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map(suggestion => (
            <div
              key={suggestion.place_id}
              className="suggestion-item"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className="suggestion-name">{suggestion.display_name}</div>
              <div className="suggestion-coords">
                Lat: {parseFloat(suggestion.lat).toFixed(4)}, Lng:{" "}
                {parseFloat(suggestion.lon).toFixed(4)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
