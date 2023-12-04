import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <AuthProvider>
  
      <BottomSheetModalProvider>
          <StackNavigator />
          </BottomSheetModalProvider>
          
      </AuthProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}


