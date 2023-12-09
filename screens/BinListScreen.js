import React from 'react';
import { View, Text } from 'react-native';
import { useLocation } from '../components/LocationContext';

const BinListScreen = () => {
  const { userLocation } = useLocation();

  return (
    <View>
      <Text>{`User's location: ${JSON.stringify(userLocation)}`}</Text>
    </View>
  );
};

export default BinListScreen;


