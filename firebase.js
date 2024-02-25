import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAzG6uIZrRS_i8mMbkhYWDoHAB_RjqBRwI',
  authDomain: 'fir-trashfinder.firebaseapp.com',
  projectId: 'fir-trashfinder',
  storageBucket: 'fir-trashfinder.appspot.com',
  messagingSenderId: '657651879670',
  appId: '1:657651879670:web:ea4bf33b540304cb6f26d7',
  measurementId: 'G-K9H7RCMZLH'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage(app)

export { auth }
export { db }
export { storage }
