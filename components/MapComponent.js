import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const MapComponent = () => {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    // Fetch bins data from Firestore
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



  // Initial region for the map
  const initialRegion = {
    latitude: 35.7895, // Example latitude for Tokyo
    longitude: 139.6917, // Example longitude for Tokyo
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={initialRegion}
      showsUserLocation={true}
      provider="google"
      customMapStyle={[]}
      
    >
      {/* Render markers for each bin */}
      {bins.map((bin) => (
        <Marker
          key={bin.id}
          coordinate={{
            latitude: bin.Location.latitude,
            longitude: bin.Location.longitude,
          }}
          title={bin.name || 'Trash Bin'}
          description="This is a trash bin"
        />
      ))}
    </MapView>
  );
};

export default MapComponent;



