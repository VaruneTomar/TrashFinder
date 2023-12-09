import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocation } from '../components/LocationContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import haversine from 'haversine-distance';

const BinListScreen = () => {
  const { userLocation } = useLocation();
  const [bins, setBins] = useState([]);

  useEffect(() => {
    fetchBins();
  }, [userLocation]);

  const fetchBins = async () => {
    try {
      const binsCollection = collection(db, 'TrashBins');
      const binsSnapshot = await getDocs(binsCollection);
      const binsData = binsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedBins = calculateDistancesAndSort(binsData, userLocation);
      setBins(sortedBins);
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
  };

  const calculateDistancesAndSort = (bins, userLocation) => {
    return bins
      .map((bin) => ({
        ...bin,
        distance: haversine(userLocation, {
          latitude: bin.Location.latitude,
          longitude: bin.Location.longitude,
        }),
      }))
      .sort((a, b) => a.distance - b.distance);
  };

  const renderItem = ({ item }) => (
    <View style={styles.binContainer}>
      <View style={styles.binItem}>
        <Text style={styles.binId}>{`Bin ID: ${item.id}`}</Text>
        <Text>{`Distance: ${item.distance.toFixed(2)} meters`}</Text>
        {/* Add additional details about the bin here */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearest Bins</Text>
      <FlatList
        data={bins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  }, header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 46,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  binContainer: {
    marginVertical: 8,
  },
  binItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  binId: {
    fontWeight: 'bold',
  },
});

export default BinListScreen;







