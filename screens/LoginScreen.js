import { View, Text, Button } from 'react-native'
import React from 'react'
import { AuthOpen } from '../hooks/useAuth'

const LoginScreen = () => {
  const { signInWithGoogle } = AuthOpen()
  


  return (
    <View>
      <Text>Login to the app</Text>
      <Button title="login" onPress={signInWithGoogle} />
    </View>
  )
}

export default LoginScreen