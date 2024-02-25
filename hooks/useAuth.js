import { View, Text, ActivityIndicator } from 'react-native'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext({})

WebBrowser.maybeCompleteAuthSession()

const config = {
  iosClientId:
    '657651879670-v70ae71bfd8v8110pecbehu76n306tm0.apps.googleusercontent.com',
  androidClientId:
    '657651879670-mgq70ecusmgesihpmne299q6e4ong2ud.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
  expoClientId: 'a3a4a86d-2854-4da6-a04d-376c2d36796c',
  webClientId:
    '657651879670-ou769lmpjoc0099aeofnnr3ul6nb6kdv.apps.googleusercontent.com',
  useProxy: true
}

const AuthProvider = ({ children }) => {
  const [test, setTest] = useState('Ok')
  const [user, setUser] = useState(null)
  const [loadingLogin, setLoadingLogin] = useState(true)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        console.log(user, 'userrrr')

        if (user) {
          console.log('user is present')
          setUser({
            name: user.displayName,
            pic: user.photoURL,
            email: user.email,
            id: user.uid
          })
          setLoadingLogin(false)
        }
        if (!user) {
          setUser(null)
          setLoadingLogin(false)
        }
      }),
    []
  )

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config)

  const signInWithGoogle = async () => {
    promptAsync()
  }

  const logOut = async () => {
    setLoadingLogin(true)
    await signOut(auth)
    setLoadingLogin(false)
  }

  const [token, setToken] = useState('')

  useEffect(() => {
    if (response?.type === 'success') {
      console.log(response.params.id_token)

      getUserInfo(response.params.id_token)
    }
  }, [response, token])

  const getUserInfo = async (t) => {
    try {
      const credential = GoogleAuthProvider.credential(t)
      await signInWithCredential(auth, credential)
    } catch (error) {
      console.log(error, 'error')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        test,
        setTest,
        user,
        setUser,
        signInWithGoogle,
        token,
        loadingLogin,
        logOut
      }}
    >
      {loadingLogin ? <ActivityIndicator /> : children}
    </AuthContext.Provider>
  )
}

const AuthOpen = () => {
  return useContext(AuthContext)
}

export { AuthOpen, AuthProvider }
