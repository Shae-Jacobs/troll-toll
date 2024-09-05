import { useBridgesById } from '../hooks/useBridges'
import { useParams } from 'react-router-dom'

export default function Map() {
  const params = useParams()
  const id = Number(params.id)
  const { data: bridge, error, isPending } = useBridgesById(id)

  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing orinvalid`)
  }

  if (!bridge || isPending) {
    return <p>Fetching map...</p>
  }
  if (error) {
    return <p>Sorry cuz, no map for you{error.message}</p>
  }
  return (
    <>
      <h1>{`${bridge.latitude}`}</h1>
      <h1>{`${bridge.longitude}`}</h1>
    </>
  )
}
