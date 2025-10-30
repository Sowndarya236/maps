import React, { useEffect, useState, useRef } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const Vehicle = () => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCwDummyExampleKey1234567890ABC'

  const containerStyle = {
    width: '100%',
    height: '500px',
    margin: '20px auto',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
  }

  const [position, setPosition] = useState({ lat: 17.385, lng: 78.4867 })
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef(null)

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  })

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setPosition((prev) => ({
          lat: prev.lat + 0.0003,
          lng: prev.lng + 0.0003
        }))
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  if (loadError) return <p>Failed to load Google Maps</p>
  if (!isLoaded) return <p>Loading map...</p>

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <h2>🚗 Vehicle Tracking Map</h2>
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={14}>
        <Marker position={position} />
      </GoogleMap>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: isPlaying ? '#ff4d4d' : '#4caf50',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {isPlaying ? 'Pause' : 'Start'}
      </button>
    </div>
  )
}

export default Vehicle
