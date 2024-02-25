import React, { useEffect } from 'react'
import { View, Alert } from 'react-native'
import MapComponent from '../components/MapComponent'
import Geolocation from 'react-native-geolocation-service' // Import from react-native-geolocation-service
import { useNavigation } from '@react-navigation/native'
import { useLocation } from '../components/LocationContext'

const HomeScreen = () => {
  const navigation = useNavigation()
  const { setLocation } = useLocation()

  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = () => {
    Geolocation.requestAuthorization('whenInUse').then((result) => {
      if (result === 'granted') {
        console.log('Location permission granted')
        getCurrentLocation()
      } else {
        console.error('Error requesting location permission')
        showPermissionErrorAlert()
      }
    })
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      (error) => {
        console.error('Error getting location:', error)
        showLocationErrorAlert()
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  const showPermissionErrorAlert = () => {
    Alert.alert(
      'Permission Required',
      'This app requires location permission to function properly. Please enable location services in your device settings.',
      [{ text: 'OK' }]
    )
  }

  const showLocationErrorAlert = () => {
    Alert.alert(
      'Location Error',
      'Unable to retrieve your current location. Please check your device settings and try again.',
      [{ text: 'OK' }]
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <MapComponent />
    </View>
  )
}

export default HomeScreen
