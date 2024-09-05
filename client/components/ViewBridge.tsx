import { useParams } from 'react-router-dom'
import { useBridgesById } from '../hooks/useBridge.ts'
import Status from './Status.tsx'
import RegPatrol from './RegPatrol.tsx'

export default function ViewBridge() {
  const params = useParams()
  const id = Number(params.id)
  const { data: bridge, error, isPending } = useBridgesById(id)

  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing orinvalid`)
  }

  if (isPending) {
    return <p>Is Loading...</p>
  }

  if (error) {
    return <p> Bridge lost on the way </p>
  }

  return (
    <>
      <div>
        <h2>{`${bridge.name}`}</h2>
        <img
          className="max-w-md"
          alt={`${bridge.name} during the daytime`}
          src={`/bridges/${bridge.imagePath}`}
        />
        <div className="flex flex-row gap-1 py-2">
          <Status id={bridge.id} />
          <RegPatrol id={bridge.id} onInvalidated={() => null} />
        </div>
        <p>
          <span>Bridge Type:</span>
          {` ${bridge.type}`}
        </p>
        <p>
          <span>Year Built:</span>
          {` ${bridge.yearBuilt}`}
        </p>
        <p>
          <span>Length:</span>
          {` ${bridge.lengthMeters}M`}
        </p>
        <p>
          <span>Car Lanes:</span>
          {` ${bridge.lanes}`}
        </p>
      </div>
    </>
  )
}
