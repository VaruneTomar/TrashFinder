import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import MapComponent from '../components/MapComponent';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = () => {
    Geolocation.requestAuthorization(
      (success) => {
        console.log('Location permission granted');
        getCurrentLocation();
      },
      (error) => {
        console.error('Error requesting location permission:', error);
        setUserLocation({ latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE });
        showPermissionErrorAlert();
      }
    );
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
        setUserLocation({ latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE });
        showLocationErrorAlert();
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const showPermissionErrorAlert = () => {
    Alert.alert(
      'Permission Required',
      'This app requires location permission to function properly. Please enable location services in your device settings.',
      [{ text: 'OK' }]
    );
  };

  const showLocationErrorAlert = () => {
    Alert.alert(
      'Location Error',
      'Unable to retrieve your current location. Please check your device settings and try again.',
      [{ text: 'OK' }]
    );
  };

  const DEFAULT_LATITUDE = 37.7749; // San Francisco latitude
  const DEFAULT_LONGITUDE = -122.4194; // San Francisco longitude

  return (
    <View style={{ flex: 1 }}>
      <MapComponent userLocation={userLocation} />
      
    </View>
  );
};

export default HomeScreen;



