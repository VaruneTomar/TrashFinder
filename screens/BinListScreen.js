import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocation } from '../components/LocationContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import haversine from 'haversine-distance';

const BinListScreen = () => {
  const { userLocation } = useLocation();
  const [bins, setBins] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBins();
  }, [userLocation, selectedDistance, currentPage]);

  const fetchBins = async () => {
    try {
      const binsCollection = collection(db, 'TrashBins');
      const binsSnapshot = await getDocs(binsCollection);
      const binsData = binsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const sortedBins = await calculateDistancesAndSort(binsData, userLocation);
      const filteredBins = filterBinsByDistance(sortedBins, selectedDistance);
  
      // Use only the bins for the current page
      const itemsPerPage = 8;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageBins = filteredBins.slice(startIndex, endIndex);
  
      // Replace with:
setBins((prevBins) => {
  if (currentPage === 1) {
    return currentPageBins;
  }
  return [...prevBins, ...currentPageBins];
});
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
  };
  

  const calculateDistancesAndSort = async (bins, userLocation) => {
    const distances = await Promise.all(
      bins.map(async (bin) => {
        const distance = await haversine(userLocation, {
          latitude: bin.Location.latitude,
          longitude: bin.Location.longitude,
        });
        return { ...bin, distance: distance / 1609.34 }; // Convert meters to miles
      })
    );

    return distances.sort((a, b) => a.distance - b.distance);
  };

  const filterBinsByDistance = (bins, distance) => {
    if (distance === null) {
      return bins; // Show all bins if no distance is selected
    }
    return bins.filter((bin) => bin.distance <= distance);
  };

  const renderDistanceButton = (distance) => (
    <TouchableOpacity
      style={[styles.distanceButton, selectedDistance === distance && styles.selectedDistanceButton]}
      onPress={() => {
        setSelectedDistance(distance);
        setCurrentPage(1); 
        setBins([]); 
      }}
    >
      <Text>{`${distance} miles`}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.binContainer}>
      <View style={styles.binItem}>
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>{item.distance.toFixed(1)} miles</Text>
        </View>
        <Text style={styles.notesText}>{`Description: ${item.Notes}`}</Text>
        <View style={styles.goButtonContainer}>
          {/* Add your "GO" button here */}
          <Text style={styles.goButtonText}>GO</Text>
        </View>
      </View>
    </View>
  );

  const handleEndReached = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearest Bins</Text>
      <View style={styles.distanceButtonsContainer}>
        {renderDistanceButton(5)}
        {renderDistanceButton(10)}
        {renderDistanceButton(25000)}
      </View>
      <FlatList
        data={bins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.9}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 56,
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  binContainer: {
    marginVertical: 2,
    width: '100%',
  },
  binItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '100%',
    marginBottom: 8,
  },
  distanceContainer: {
    marginRight: 16,
    backgroundColor: '#65a1e7',
    borderRadius: 25,
    padding: 8,
  },
  distanceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notesText: {
    flex: 1,
    marginLeft: 16,
  },
  goButtonContainer: {
    marginLeft: 'auto',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  goButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  distanceButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  distanceButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  selectedDistanceButton: {
    backgroundColor: 'lightblue',
  },
});

export default BinListScreen;









