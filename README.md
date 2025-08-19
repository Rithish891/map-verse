# MapVerse React Application

A React application that integrates OpenStreetMap using Leaflet for interactive mapping functionality without using react-leaflet.

## Features

### 🔍 Search Functionality

- **Text Search**: Search for locations with real-time suggestions
- **Suggestion Display**: Shows location name, latitude, and longitude
- **Auto-complete**: Debounced search with instant results

### 📍 Map Markers

- **Blue Markers**: Search result locations
- **Red Markers**: User-selected locations (clicked on map)
- **Interactive Markers**: Click markers to view detailed information

### 🌍 Location Services

- **Default Location**: Automatically centers on user's current location
- **Geolocation Fallback**: Falls back to New York City if location access is denied
- **Reverse Geocoding**: Get detailed information about clicked locations

### 🎛️ Map Controls

- **Zoom In/Out**: Custom zoom controls in bottom-right corner
- **Show Your Location**: Button to center map on current location
- **Loading States**: Visual feedback during location operations

### 📱 Responsive Design

- **Mobile Friendly**: Optimized for different screen sizes
- **Touch Support**: Works well on touch devices
- **Adaptive Layout**: Controls and interface adapt to screen size

## Project Structure

```
src/
├── components/          # React components
│   ├── Map.tsx         # Main map component
│   ├── SearchBox.tsx   # Search input and suggestions
│   ├── LocationDetails.tsx  # Location information panel
│   ├── MapControls.tsx # Zoom and location controls
│   └── *.css          # Component styles
├── hooks/              # Custom React hooks
│   └── useGeolocation.ts  # Geolocation hook
├── types/              # TypeScript type definitions
│   └── index.ts       # All type definitions
├── constants/          # Application constants
│   └── index.ts       # Map config, API endpoints, etc.
├── utils/              # Utility functions
│   └── index.ts       # Search, geocoding, debounce functions
└── App.tsx            # Main application component
```

## Technology Stack

- **React 19** with TypeScript
- **Leaflet** for map rendering (no react-leaflet)
- **OpenStreetMap** for map tiles
- **Nominatim API** for geocoding and search
- **Vite** for development and building

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd open-maps-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

### Searching for Locations

1. Type in the search box at the top-left of the map
2. Select from the dropdown suggestions
3. The map will center on the selected location with a blue marker

### Selecting Locations on Map

1. Click anywhere on the map
2. A red marker will appear at the clicked location
3. Location details will be displayed in the right panel

### Map Controls

- **+**: Zoom in
- **−**: Zoom out
- **🎯**: Center map on your current location

### Viewing Location Details

- Click on any marker to view detailed information
- The details panel shows coordinates, address, and location type
- Click the × to close the details panel

## API Usage

The application uses the Nominatim API for:

- **Search**: Finding locations based on text queries
- **Reverse Geocoding**: Getting location details from coordinates

No API key is required for basic usage, but please respect the usage policy.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Geolocation requires HTTPS in production environments.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
