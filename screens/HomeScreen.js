import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapComponent from '../components/MapComponent';
import BottomSheet from '../components/BottomSheet';

const HomeScreen = () => {
 /*  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(false);
  }; */

  return (
    <View style={{ flex: 1 }}>
      <MapComponent />

     

    </View>
  );
};

export default HomeScreen;

