import { createContext, useContext, useState } from 'react'

const LocationContext = createContext()

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null)

  const setLocation = (location) => {
    setUserLocation(location)
  }

  return (
    <LocationContext.Provider value={{ userLocation, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocation needed within a LocationProvider')
  }
  return context
}
