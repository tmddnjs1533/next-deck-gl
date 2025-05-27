# Map Visualization App with Next.js, deck.gl, and Mapbox

This project demonstrates how to create a map-based data visualization application using Next.js, TypeScript, deck.gl, and Mapbox. It showcases rendering a Hexagon Layer and a Building Layer on a Mapbox map.

## Features

*   Interactive map powered by Mapbox and deck.gl.
*   **Hexagon Layer:** Visualizes point data aggregated into hexagonal bins.
*   **Building Layer:** Displays extruded building footprints from GeoJSON data.
*   **Layer Toggling:** UI controls to show/hide individual layers.
*   Built with Next.js (App Router) and TypeScript.

## Technologies Used

*   Next.js
*   React
*   TypeScript
*   deck.gl
*   Mapbox GL JS
*   react-map-gl
*   @loaders.gl (core and tiles, though tiles are not used in the current GeoJSON example)

## Project Structure

*   `map-visualization-app/src/app/page.tsx`: Main page component, sets up layers and UI controls.
*   `map-visualization-app/src/components/Map.tsx`: Reusable Map component integrating DeckGL and ReactMapGL.
*   `map-visualization-app/src/app/globals.css`: Global styles, including for the map and UI controls.
*   `map-visualization-app/.env.local`: For storing the Mapbox access token (needs to be created by the user).
*   `map-visualization-app/public/`: Static assets (if any).

## Setup and Installation

1.  **Clone the repository (or ensure you have the project files):**
    ```bash
    # If this were a git repo:
    # git clone <repository-url>
    # cd map-visualization-app
    ```

2.  **Install dependencies:**
    Navigate to the `map-visualization-app` directory and install the required npm packages.
    ```bash
    cd map-visualization-app
    npm install
    ```

3.  **Configure Mapbox Access Token:**
    *   Create a Mapbox account at [https://www.mapbox.com/](https://www.mapbox.com/) if you don't have one.
    *   Obtain your Mapbox access token from your account page.
    *   Create a file named `.env.local` in the root of the `map-visualization-app` directory.
    *   Add your token to this file:
        ```
        NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="YOUR_ACTUAL_MAPBOX_ACCESS_TOKEN"
        ```
    *   **Note:** The project currently uses a placeholder token. You **must** replace `"YOUR_ACTUAL_MAPBOX_ACCESS_TOKEN"` with your real token for the map to load correctly.

## Running the Development Server

Once the dependencies are installed and the Mapbox token is configured, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Customization

*   **Data:** Modify the `HEXAGON_SAMPLE_DATA` and `BUILDING_SAMPLE_DATA` in `src/app/page.tsx` to use your own datasets.
*   **Layer Properties:** Adjust the properties of `HexagonLayer` and `GeoJsonLayer` in `src/app/page.tsx` to change their appearance and behavior.
*   **Map Style:** Change the `mapStyle` prop in `src/components/Map.tsx` to use different Mapbox base maps.
