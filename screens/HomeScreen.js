import { View, Text } from 'react-native'
import React from 'react'
import MapComponent from '../components/MapComponent';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Other UI components specific to HomeScreen */}
      <MapComponent />
    </View>
  )
}

export default HomeScreen