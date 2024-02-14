import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddBinScreen = ({ onClose }) => {
  const [binDescription, setBinDescription] = useState('');

  const handleAddBin = () => {
    
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Bin</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter bin description"
        value={binDescription}
        onChangeText={(text) => setBinDescription(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddBin}>
        <Text style={styles.buttonText}>Add Bin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddBinScreen;

