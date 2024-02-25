import React from 'react'
import { Image, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import BinListScreen from './screens/BinListScreen'
import { AuthOpen } from './hooks/useAuth'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const CustomTabIcon = ({ source, focused, iconWidth, iconHeight }) => (
  <View style={{ alignItems: 'center', marginTop: 25 }}>
    <View
      style={{
        width: 47,
        height: 47,
        borderRadius: 50,
        backgroundColor: focused ? 'rgb(217, 240, 273)' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Image source={source} style={{ width: iconWidth, height: iconHeight }} />
    </View>
  </View>
)

const HomeIcon = ({ focused }) => (
  <CustomTabIcon
    source={require('./assets/mapicon.png')}
    focused={focused}
    iconWidth={30}
    iconHeight={30}
  />
)

const BinListIcon = ({ focused }) => (
  <CustomTabIcon
    source={require('./assets/trashbinListicon.png')}
    focused={focused}
    iconWidth={50}
    iconHeight={50}
  />
)

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        backgroundColor: 'black',
        headerShown: false
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />
        }}
      />
    </Stack.Navigator>
  )
}

const StackNavigator = () => {
  const { user, setUser } = AuthOpen()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
          backgroundColor: 'rgb(248, 246, 249)',
          height: 70
        }
      }}
    >
      {user ? (
        <>
          <Tab.Screen
            name='Home'
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarLabel: '',
              tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />
            }}
          />
          <Tab.Screen
            name='BinList'
            component={BinListScreen}
            options={{
              headerShown: false,
              tabBarLabel: '',
              tabBarIcon: ({ focused }) => <BinListIcon focused={focused} />
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name='Login'
          component={LoginScreen}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarStyle: { display: 'none' }
          }}
        />
      )}
    </Tab.Navigator>
  )
}

export default StackNavigator
