import { useState, useEffect } from 'react'

function useGeolocation() {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser.',
      }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          loading: false,
          error: null,
        })
      },
      (err) => {
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: 'Unable to retrieve your location. Please allow location access.',
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }, [])

  return location
}

export default useGeolocation