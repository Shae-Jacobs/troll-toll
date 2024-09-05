import { useParams } from 'react-router-dom'
import { useBridgesById } from '../hooks/useBridges.ts'
import Status from './Status.tsx'
import RegPatrol from './RegPatrol.tsx'
import Map from './Map.tsx'
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
      <div className="custom_flex container mx-auto mt-8">
        <div className="w-1/3 px-8">
          <img
            className="h-auto w-full"
            alt={`${bridge.name} during the daytime`}
            src={`/bridges/${bridge.imagePath}`}
          />
        </div>

        <div className="flex w-1/3 flex-col">
          <div>
            <h2 className="heading-2 pb-6">{`${bridge.name}`}</h2>
          </div>

          <div className="flex items-center pb-6">
            <button className="primary_button mr-6">Fav Button</button>
            <RegPatrol id={bridge.id} />
            <div className="ml-2">
              <Status id={bridge.id} />
            </div>
          </div>

          <div>
            <p>
              <span className="font-bold">Bridge Type:</span>
              {` ${bridge.type}`}
            </p>
            <p>
              <span className="font-bold">Year Built:</span>
              {` ${bridge.yearBuilt}`}
            </p>
            <p>
              <span className="font-bold">Length:</span>
              {` ${bridge.lengthMeters}M`}
            </p>
            <p>
              <span className="font-bold">Car Lanes:</span>
              {` ${bridge.lanes}`}
            </p>
          </div>
        </div>
      </div>
      <Map />
    </>
  )
}
