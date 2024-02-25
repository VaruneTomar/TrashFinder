import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { addDoc, collection, GeoPoint } from 'firebase/firestore'
import { useLocation } from '../components/LocationContext'
import { db } from '../firebase'

const AddBinScreen = ({ onClose }) => {
  const [binDescription, setBinDescription] = useState('')
  const [isConfirmed, setConfirmed] = useState(false)
  const maxLength = 100
  const [descriptionError, setDescriptionError] = useState('')
  const { userLocation } = useLocation()

  const handleAddBin = async () => {
    try {
      if (!binDescription) {
        setDescriptionError('Please enter a description.')
        return
      } else if (!isConfirmed) {
        setDescriptionError('Please confirm the presence of a trash bin.')
        return
      }

      const newBin = {
        Notes: binDescription,
        Location: new GeoPoint(userLocation.latitude, userLocation.longitude)
      }

      const binRef = await addDoc(collection(db, 'TrashBins'), newBin)

      console.log('Bin added successfully with ID: ', binRef.id)

      setDescriptionError('')
      setBinDescription('')
      setConfirmed(false)
      onClose()
    } catch (error) {
      console.error('Error adding bin:', error)
    }
  }

  const handleTextChange = (text) => {
    const cleanedText = text.replace(/\t/g, ' ')
    const normalizedText = cleanedText.replace(/ {2,}/g, ' ')
    const trimmedText = normalizedText.trim()

    if (trimmedText.length <= maxLength) {
      setBinDescription(trimmedText)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Add Trash Bin Location</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter detailed trash bin location description'
        value={binDescription}
        onChangeText={handleTextChange}
        multiline={true}
        numberOfLines={2}
        maxLength={maxLength}
      />
      {binDescription.length === maxLength && (
        <Text style={styles.characterLimitText}>
          Maximum character limit reached ({maxLength} characters).
        </Text>
      )}
      <View style={styles.confirmationContainer}>
        <BouncyCheckbox
          isChecked={isConfirmed}
          size={20}
          onPress={(isChecked) => setConfirmed(isChecked)}
          fillColor='green'
          unfillColor='#FFFFFF'
          iconStyle={{ borderColor: 'red' }}
          textStyle={{ fontFamily: 'JosefinSans-Regular' }}
          text='A trash bin marker will be added at your approximate current position, please confirm this is correct.'
        />
      </View>
      {descriptionError ? (
        <Text style={styles.errorText}>{descriptionError}</Text>
      ) : null}
      <TouchableOpacity style={styles.addButton} onPress={handleAddBin}>
        <Text style={styles.buttonText}>ADD BIN</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    maxWidth: 320,
    minWidth: 320,
    fontSize: 16,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    minHeight: 100
  },
  characterLimitText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  },
  addButton: {
    backgroundColor: 'rgb(66, 213, 82)',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    left: 5
  },
  cancelButtonText: {
    color: 'rgb(10, 132, 255)',
    fontSize: 18
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
})

export default AddBinScreen
