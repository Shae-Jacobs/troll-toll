import { useBridgesById } from '../hooks/useBridge'
import { useParams } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { API_HOST } from '../env'
const containerStyle = {
  width: '100%',
  height: '500px',
}

const defaultCenter = {
  lat: -36.830291, // Default latitude
  lng: 174.745348, // Default longitude
}

export default function Map() {
  const params = useParams()
  const id = Number(params.id)
  const { data: bridge, error, isPending } = useBridgesById(id)
console.log(API_HOST)
  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing or invalid`)
  }

  if (!bridge || isPending) {
    return <p>Fetching map...</p>
  }
  if (error) {
    return <p>Sorry cuz, no map for you{error.message}</p>
  }
  const center =
    bridge.latitude && bridge.longitude
      ? {
          lat: bridge.latitude,
          lng: bridge.longitude,
        }
      : defaultCenter
  return (
    <>
      <section className="mx-auto my-8 w-1/2 rounded-md border-8 border-accent-4">
        <LoadScript googleMapsApiKey={API_HOST}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </section>
    </>
  )
}
