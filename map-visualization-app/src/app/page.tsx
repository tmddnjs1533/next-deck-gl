"use client";

import MapComponent from '@/components/Map';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { GeoJsonLayer } from '@deck.gl/layers';
import { useEffect, useState } from 'react';

// Sample data (keep existing data definitions for HEXAGON_SAMPLE_DATA and BUILDING_SAMPLE_DATA)
const HEXAGON_SAMPLE_DATA = [
  { position: [-122.41669, 37.7853] }, { position: [-122.41679, 37.7843] },
  { position: [-122.41689, 37.7858] }, { position: [-122.41699, 37.7848] },
  { position: [-122.41709, 37.7851] }, { position: [-122.41719, 37.7841] },
  { position: [-122.41729, 37.7855] }, { position: [-122.41739, 37.7845] },
  { position: [-122.41839, 37.7850] }, { position: [-122.41939, 37.7855] },
];
for (let i = 0; i < 100; i++) {
  HEXAGON_SAMPLE_DATA.push({
    position: [
      -122.41669 + (Math.random() - 0.5) * 0.02,
      37.7853 + (Math.random() - 0.5) * 0.02
    ]
  });
}

const BUILDING_SAMPLE_DATA = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { height: 100, color: [255, 0, 0] },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-122.415, 37.786], [-122.415, 37.787], [-122.414, 37.787], [-122.414, 37.786], [-122.415, 37.786]]]
      }
    },
    {
      type: 'Feature',
      properties: { height: 200, color: [0, 0, 255] },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-122.418, 37.784], [-122.418, 37.785], [-122.417, 37.785], [-122.417, 37.784], [-122.418, 37.784]]]
      }
    },
    {
      type: 'Feature',
      properties: { height: 150, color: [0, 255, 0] },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-122.420, 37.788], [-122.420, 37.789], [-122.419, 37.789], [-122.419, 37.788], [-122.420, 37.788]]]
      }
    }
  ]
};


export default function HomePage() {
  const [layers, setLayers] = useState<any[]>([]);
  const [showHexagonLayer, setShowHexagonLayer] = useState(true);
  const [showBuildingLayer, setShowBuildingLayer] = useState(true);

  useEffect(() => {
    const activeLayers = [];

    if (showHexagonLayer) {
      activeLayers.push(new HexagonLayer({
        id: 'hexagon-layer',
        data: HEXAGON_SAMPLE_DATA,
        getPosition: (d: any) => d.position,
        getElevationWeight: () => Math.random() * 100,
        getColorWeight: () => Math.random() * 100,
        extruded: true,
        radius: 100,
        elevationScale: 4,
        pickable: true,
        colorRange: [
          [1, 152, 189], [73, 227, 206], [216, 254, 181],
          [254, 237, 177], [254, 173, 84], [209, 55, 78]
        ]
      }));
    }

    if (showBuildingLayer) {
      activeLayers.push(new GeoJsonLayer({
        id: 'geojson-building-layer',
        data: BUILDING_SAMPLE_DATA,
        opacity: 0.8,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        getElevation: (f: any) => f.properties.height,
        getFillColor: (f: any) => f.properties.color || [200, 200, 200],
        getLineColor: [255, 255, 255],
        pickable: true,
      }));
    }
    setLayers(activeLayers);
  }, [showHexagonLayer, showBuildingLayer]); // Re-run effect when visibility states change

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <MapComponent layers={layers} />
      <div className="controls-panel">
        <h3>Layer Controls</h3>
        <div>
          <input
            type="checkbox"
            id="hexagonToggle"
            checked={showHexagonLayer}
            onChange={(e) => setShowHexagonLayer(e.target.checked)}
          />
          <label htmlFor="hexagonToggle">Show Hexagon Layer</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="buildingToggle"
            checked={showBuildingLayer}
            onChange={(e) => setShowBuildingLayer(e.target.checked)}
          />
          <label htmlFor="buildingToggle">Show Building Layer</label>
        </div>
      </div>
    </div>
  );
}
