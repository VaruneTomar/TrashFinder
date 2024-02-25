import React, { useEffect, useState, useRef } from 'react'
import {
  Platform,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  View
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import BottomSheet from './BottomSheet'
import AddBinScreen from '../screens/AddBinScreen'
import { useLocation } from '../components/LocationContext'

const MapComponent = () => {
  const { userLocation } = useLocation()
  const [bins, setBins] = useState([])
  const [selectedBin, setSelectedBin] = useState(null)
  const [isAddBinModalVisible, setAddBinModalVisible] = useState(false)
  const mapRef = useRef(null)

  useEffect(() => {
    fetchBins()

    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    }
  }, [userLocation])

  const fetchBins = async () => {
    try {
      const binsCollection = collection(db, 'TrashBins')
      const binsSnapshot = await getDocs(binsCollection)
      const binsData = binsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setBins(binsData)
    } catch (error) {
      console.error('Error fetching bins:', error)
    }
  }

  const handleMarkerPress = (bin) => {
    setSelectedBin(bin)
  }

  const handleCloseBottomSheet = () => {
    setSelectedBin(null)
  }

  const handleZoomToUserLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.02, 
      longitudeDelta: 0.02
      })
    }
  }

  const handleAddBinPress = () => {
    setAddBinModalVisible(true)
  }

  const handleAddBinClose = () => {
    setAddBinModalVisible(false)
  }

  const renderMarkers = () => {
    return bins.map((bin) => (
      <Marker
        key={bin.id}
        coordinate={{
          latitude: bin.Location.latitude,
          longitude: bin.Location.longitude
        }}
        onPress={() => handleMarkerPress(bin)}
      >
        <Image
          source={require('../assets/binmarkericon.png')}
          style={styles.BinMarkerIcon}
        />
      </Marker>
    ))
  }

  const renderMap = () => {
    if (Platform.OS === 'android') {
      return (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          showsUserLocation={true}
          provider='google'
          customMapStyle={[]}
        >
          {renderMarkers()}
        </MapView>
      )
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
      )
    }
  }

  return (
    <>
      {renderMap()}
      <TouchableOpacity
        style={styles.zoomButton}
        onPress={handleZoomToUserLocation}
      >
        <Image
          source={require('../assets/mylocation.png')}
          style={styles.zoomButtonImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addBinButton} onPress={handleAddBinPress}>
        <Image
          source={require('../assets/addbinicon.png')}
          style={styles.addBinImage}
        />
      </TouchableOpacity>
      {selectedBin && (
        <BottomSheet
          isOpen={!!selectedBin} // Set isOpen based on the presence of selectedBin
          onClose={handleCloseBottomSheet}
          bin={selectedBin}
        />
      )}

      <Modal
        animationType='slide'
        visible={isAddBinModalVisible}
        presentationStyle='formSheet'
        onRequestClose={handleAddBinClose}
      >
        <View style={styles.modalContainer}>
          <AddBinScreen onClose={handleAddBinClose} />
        </View>
      </Modal>
    </>
  )
}

const styles = {
  zoomButton: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    padding: 2
  },
  addBinButton: {
    position: 'absolute',
    top: 60,
    left: 5,
    padding: 4
  },
  addBinImage: {
    width: 60,
    height: 60
  },
  zoomButtonImage: {
    width: 40,
    height: 40
  },
  BinMarkerIcon: {
    width: 100,
    height: 100
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(248, 246, 249)'
  }
}

export default MapComponent
