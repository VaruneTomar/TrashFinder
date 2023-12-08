import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BottomSheet from './BottomSheet';

const MapComponent = () => {
  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const binsCollection = collection(db, 'TrashBins');
        const binsSnapshot = await getDocs(binsCollection);
        const binsData = binsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBins(binsData);
      } catch (error) {
        console.error('Error fetching bins:', error);
      }
    };

    fetchBins();
  }, []);

  const handleMarkerPress = (bin) => {
    setSelectedBin(bin);
  };

  const handleCloseBottomSheet = () => {
    setSelectedBin(null);
  };

  const renderMarkers = () => {
    return bins.map((bin) => (
      <Marker
        key={bin.id}
        coordinate={{
          latitude: bin.Location.latitude,
          longitude: bin.Location.longitude,
        }}
        onPress={() => handleMarkerPress(bin)}
      />
    ));
  };

  const renderMap = () => {
    if (Platform.OS === 'android') {
      // Use Google Maps for Android
      return (
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          provider="google"
          customMapStyle={[]}
        >
          {renderMarkers()}
        </MapView>
      );
    } else {
      // Use Apple Maps for iOS
      return (
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
           // Note: For iOS, 'google' provider still works with Apple Maps
          customMapStyle={[]}
        >
          {renderMarkers()}
        </MapView>
      );
    }
  };

  return (
    <>
      {renderMap()}
      {selectedBin && (
        <BottomSheet
          isOpen={true} // Assuming it should be open when a marker is selected
          onClose={handleCloseBottomSheet}
          bin={selectedBin}
        />
      )}
    </>
  );
};

export default MapComponent;









