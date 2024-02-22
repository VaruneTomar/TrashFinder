import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const BottomSheet = ({ isOpen, onClose, bin }) => {
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleOpenMaps = (latitude, longitude) => {
    const mapsLink = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
    Linking.openURL(mapsLink);
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={['25%', '40%']}
      onChange={(index) => {
        if (index === -1) {
          onClose();
        }
      }}
    >
      <View style={styles.container}>
        <Text style={styles.description}>{bin.Notes}</Text>
        <TouchableOpacity style={styles.goButton}  onPress={() => handleOpenMaps(bin.Location.latitude, bin.Location.longitude)}
        >
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  goButton: {
    backgroundColor: 'rgb(66, 213, 82)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  goButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BottomSheet;






