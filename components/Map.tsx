"use client";

import { GoogleMap, Data } from "@react-google-maps/api";

const defaultMapContainerStyle = {
  width: "100%",
  height: "88vh",
};

const defaultMapCenter = {
  lat: 37.8,
  lng: -96,
};

const defaultMapOptions = {
  zoomControl: true,
  gestureHandling: "auto",
  minZoom: 3,
  styles: [
    // Turn off other labels and features for simplicity
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }], // Neutral background
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#b0e0e6" }], // Light blue for water
    },
  ],
};

const defaultMapZoom = 4;

const MapComponent = () => {
  const handleCountryLoad = (data:any) => {
    // Add a GeoJSON layer for USA
    data.loadGeoJson(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA.geo.json"
    );
    data.setStyle({
      fillColor: "#87ceeb", // Sky blue for the USA
      strokeColor: "#02c8f5", // Blue stroke
      strokeWeight: 2,
    });
  };

//   const handleCountyLoad = (data) => {
//     // Add a GeoJSON layer for USA counties
//     data.loadGeoJson(
//       "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json"
//     );
//     data.setStyle({
//       fillColor: "#b0e57c", // Light green for counties
//       strokeColor: "#228B22", // Dark green stroke for county borders
//       strokeWeight: 1,
//     });
//   };

const handleStateLoad = (data:any) => {
    // stateLayerRef.current = data;

    data.loadGeoJson(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    );
    data.setStyle({
      fillColor: "#d2f2fc", // Light salmon for states
      strokeColor: "#02c8f5", // OrangeRed for state boundaries
      strokeWeight: 0.5,
    });

    // data.addListener("click", (event) => {
    //   // Zoom in when a state is clicked
    //   const bounds = new window.google.maps.LatLngBounds();
    //   event.feature.getGeometry().forEachLatLng((latLng) => bounds.extend(latLng));
    //   data.getMap().fitBounds(bounds);

    //   // Show counties when a state is clicked
    //   if (countyLayerRef.current) {
    //     countyLayerRef.current.setStyle({ visible: true });
    //   }
    // });
  };

  return (
    <GoogleMap
      mapContainerStyle={defaultMapContainerStyle}
      center={defaultMapCenter}
      zoom={defaultMapZoom}
      options={defaultMapOptions}
    >
      {/* GeoJSON Layer for USA */}
      <Data onLoad={handleCountryLoad} />
      <Data onLoad={handleStateLoad} />
      {/* GeoJSON Layer for Counties */}
      {/* <Data onLoad={handleCountyLoad} /> */}
    </GoogleMap>
  );
};

export { MapComponent };
