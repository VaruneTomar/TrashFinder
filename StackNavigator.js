import React from 'react';
import { Image, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import BinListScreen from './screens/BinListScreen';
import { AuthOpen } from './hooks/useAuth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeIcon = () => (
  <View style={{ alignItems: 'center', marginTop: 21 }}>
    <Image
      source={require('./assets/mapicon.png')}
      style={{ width: 30, height: 30 }}
    />
  </View>
);

const BinListIcon = () => (
  <View style={{ alignItems: 'center', marginTop: 25 }}>
    <Image
      source={require('./assets/trashbinListicon.png')}
      style={{ width: 74, height: 54 }}
    />
  </View>
);

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        backgroundColor: 'black',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { user, setUser } = AuthOpen();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
          backgroundColor: 'white',
          height: 70,
        },
      }}
    >
      {user ? (
        <>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: HomeIcon,
              tabBarLabel: '',
            }}
          />
          <Tab.Screen
            name="BinList"
            component={BinListScreen}
            options={{
              headerShown: false,
              tabBarLabel: '',
              tabBarIcon: BinListIcon,
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarStyle: { display: 'none' },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default StackNavigator;






