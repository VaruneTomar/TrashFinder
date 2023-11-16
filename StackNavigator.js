import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { AuthOpen } from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user, setUser } = AuthOpen();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Set headerShown to false to hide the header for the entire stack
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
