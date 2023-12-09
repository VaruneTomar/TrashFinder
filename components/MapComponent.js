import React, { useEffect, useState, useRef } from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BottomSheet from './BottomSheet';
import { useLocation } from '../components/LocationContext'; 

const MapComponent = () => {
  const { userLocation } = useLocation(); 
  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    fetchBins();

    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [userLocation]);

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

  const handleMarkerPress = (bin) => {
    setSelectedBin(bin);
  };

  const handleCloseBottomSheet = () => {
    setSelectedBin(null);
  };

  const handleZoomToUserLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
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
      return (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          showsUserLocation={true}
          provider="google"
          customMapStyle={[]}
        >
          {renderMarkers()}
        </MapView>
      );
    } else {
      return (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          showsUserLocation={true}
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
      <TouchableOpacity style={styles.zoomButton} onPress={handleZoomToUserLocation}>
        <Text style={styles.zoomButtonText}>Zoom to User Location</Text>
      </TouchableOpacity>
      {selectedBin && (
        <BottomSheet
          isOpen={true}
          onClose={handleCloseBottomSheet}
          bin={selectedBin}
        />
      )}
    </>
  );
};

const styles = {
  zoomButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  zoomButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default MapComponent;













