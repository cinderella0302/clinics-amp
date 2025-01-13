import React from "react";
import { Source, Layer } from "react-map-gl";

interface HeatmapLayerProps {
  heatmapData: any;
  heatmapVisible: boolean;
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({
  heatmapData,
  heatmapVisible,
}) => {
  if (!heatmapData) return null;

  return (
    // console.log(heatmapData),
    <>
      {heatmapData && heatmapVisible && (
        <>
          <Source id="heatmap-layer" type="geojson" data={heatmapData}>
            {/* Filled County Layer */}
            <Layer
              id="county-fill-layer"
              type="fill"
              paint={{
                "fill-color": [
                  "interpolate",
                  ["cubic-bezier", 0.42, 0, 0.58, 1], // Smooth transition
                  ["get", "score"],
              
                  // Updated Colors for Scores
                  0, "rgba(244, 236, 247, 0.8)",  // Very Low (Light Purple)
                  2, "rgb(189, 201, 225)",       // Low (Soft Lavender)
                  4, "rgb(116, 169, 207)",       // Moderate (Muted Blue)
                  6, "rgb(43, 140, 190)",        // Above Average (Blue-Green)
                  8, "rgb(4, 90, 141)",          // High (Dark Teal)
                  10, "rgb(33, 102, 172)",       // Very High (Deep Blue)
                ],
                "fill-opacity": 0.75,  // Adjusted for better visibility
              }}
              
              filter={["has", "score"]}
            />

            {/* County Borders */}
            <Layer
              id="county-borders"
              type="line"
              paint={{
                "line-color": "#4475ad",
                "line-width": 1.5, // Thicker border for visibility
              }}
            />
          </Source>
        </>
      )}
    </>
  );
};

export default HeatmapLayer;
