import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = () => {
  // Initial region for the map
  const initialRegion = {
    latitude: 35.6895, // Example latitude for Tokyo
    longitude: 139.6917, // Example longitude for Tokyo
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={initialRegion}
      showsUserLocation={true} // Optional: Show user's location
      provider="google" // Specify Google Maps as the map provider
      customMapStyle={[] /* Optional: Add your custom map style */}
    >
      {/* Example Marker */}
      <Marker
        coordinate={{ latitude: 35.6895, longitude: 139.6917 }}
        title="Trash Bin"
        description="This is a trash bin"
      />
    </MapView>
  );
};

export default MapComponent;

