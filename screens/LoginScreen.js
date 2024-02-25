import React from 'react'
import { View, Text, Button } from 'react-native'
import { AuthOpen } from '../hooks/useAuth'

const LoginScreen = () => {
  const { signInWithGoogle } = AuthOpen()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login to the app</Text>
      <Button title='Login' onPress={signInWithGoogle} />
    </View>
  )
}

export default LoginScreen
