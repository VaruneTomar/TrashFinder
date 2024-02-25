import React from 'react'
import StackNavigator from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './hooks/useAuth'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LocationProvider } from './components/LocationContext'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <LocationProvider>
            <BottomSheetModalProvider>
              <StackNavigator />
            </BottomSheetModalProvider>
          </LocationProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
