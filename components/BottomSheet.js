import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const BottomSheet = ({ isOpen, onClose, bin }) => {
  const bottomSheetModalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present()
    } else {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [isOpen])

  const handleOpenMaps = (latitude, longitude) => {
    const mapsLink = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`
    Linking.openURL(mapsLink)
  }

  const handleReport = () => {
    // Implement the logic for handling the report here
    console.log('Report button pressed!')
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={['33%', '40%']}
      onChange={(index) => {
        if (index === -1) {
          onClose()
        }
      }}
    >
      <View style={styles.container}>
        <Text style={styles.description}>{bin.Notes}</Text>
        <TouchableOpacity
          style={styles.goButton}
          onPress={() =>
            handleOpenMaps(bin.Location.latitude, bin.Location.longitude)
          }
        >
          <Text style={styles.goButtonText}>GO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
          <Text style={styles.reportButtonText}>REPORT</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    paddingLeft: 3,
  },
  goButton: {
    backgroundColor: 'rgb(66, 213, 82)',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  goButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  reportButton: {
    backgroundColor: 'red',
    padding: 12,
    marginTop: 13,
    borderRadius: 8,
    alignItems: 'center'
  },
  reportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default BottomSheet
