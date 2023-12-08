import React, { useEffect } from 'react';
import { View } from 'react-native';
import MapComponent from '../components/MapComponent';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = () => {
    Geolocation.requestAuthorization(
      () => {
        // Success callback, handle successful permission request
        console.log('Location permission granted');
      },
      (error) => {
        // Error callback, handle permission request error
        console.error('Error requesting location permission:', error);
        showPermissionErrorAlert();
      }
    );
  };

  const showPermissionErrorAlert = () => {
    // Implement your logic to show an alert to the user
  };

  return (
    <View style={{ flex: 1 }}>
      <MapComponent />
      {/* Additional UI components */}
    </View>
  );
};

export default HomeScreen;


