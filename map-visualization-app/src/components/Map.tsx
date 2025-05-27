"use client"; // Required for Next.js App Router components that use client-side hooks

import React, { useRef, useState } from 'react';
import DeckGL from '@deck.gl/react';
import {Map, NavigationControl, useControl, Layer} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import {MapboxOverlay} from '@deck.gl/mapbox';
// Define initial viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};
const buildings3DLayer = {
  id: '3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion' as const,
  minzoom: 14,
  paint: {
    'fill-extrusion-color': '#ccc',
    'fill-extrusion-height': ['get', 'height']
  }
};

function DeckGLOverlay(props) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

// Define types for component props (if any, for now empty)
interface MapComponentProps {
  // layers to be passed from parent
  layers?: any[]; 
}

const MapComponent: React.FC<MapComponentProps> = ({ layers }) => {
  const mapRef = useRef(null);
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!mapboxAccessToken) {
    console.error("Mapbox access token is not set. Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in your .env.local file.");
    return <div style={{padding: "20px", textAlign: "center", color: "red"}}>Error: Mapbox access token is not configured.</div>;
  }

  return <Map ref={mapRef} initialViewState={INITIAL_VIEW_STATE} mapboxAccessToken={mapboxAccessToken}  mapStyle="mapbox://styles/mapbox/streets-v11">
 <DeckGLOverlay interleaved={true} layers={layers} />
    <NavigationControl />
      <Layer {...buildings3DLayer} />
  </Map>;

  // return (
  //   <DeckGL
  //     initialViewState={INITIAL_VIEW_STATE}
  //     controller={true} // Enables map navigation
  //     layers={layers || []} // Pass layers to DeckGL
  //   >
  //     <Map
  //       mapboxAccessToken={mapboxAccessToken}
  //       mapStyle="mapbox://styles/mapbox/streets-v11" // You can choose any Mapbox style
  //     />
  //   </DeckGL>
  // );
};

export default MapComponent;
