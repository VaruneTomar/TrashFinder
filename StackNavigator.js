import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import BinListScreen from './screens/BinListScreen';
import { AuthOpen } from './hooks/useAuth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { user, setUser } = AuthOpen();

  return (
    <Tab.Navigator>
      {user ? (
        <>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
            }}
          />
          
          <Tab.Screen
            name="BinList"
            component={BinListScreen}
            options={{ tabBarBadge: 1, headerShown: false }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' }, // Hide the tab bar on LoginScreen
          }}
        />
      )}
      
    </Tab.Navigator>
  );
};

export default StackNavigator;


