import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
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
  
      
      const itemsPerPage = 8;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageBins = filteredBins.slice(startIndex, endIndex);
  
      
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
        return { ...bin, distance: distance / 1609.34 }; 
      })
    );

    return distances.sort((a, b) => a.distance - b.distance);
  };

  const filterBinsByDistance = (bins, distance) => {
    if (distance === null) {
      return bins; 
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
        <Text style={styles.notesText}>{`${item.Notes}`}</Text>
        <TouchableOpacity
          style={styles.goButtonContainer}
          onPress={() => handleOpenMaps(item.Location.latitude, item.Location.longitude)}
        >
          <Text style={styles.goButtonText}>GO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleOpenMaps = (latitude, longitude) => {
    const mapsLink = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
    Linking.openURL(mapsLink);
  };
  
  

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
    fontSize: 22,
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
    backgroundColor: 'rgb(217, 240, 273)',
    borderRadius: 25,
    padding: 8,
  },
  distanceText: {
    color: 'black',
    fontWeight: 'bold',
  },
  notesText: {
    flex: 1,
    marginLeft: 1,
    paddingRight: 10,
  },
  goButtonContainer: {
    marginLeft: 'auto',
    backgroundColor: 'rgb(66, 213, 82)',
    padding: 10,
    borderRadius: 5,
  },
  goButtonText: {
    color: 'white',
    fontWeight: "bold",
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
    backgroundColor: 'rgb(217, 240, 273)',
  },
});

export default BinListScreen;









