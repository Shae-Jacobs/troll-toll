import { Link } from 'react-router-dom'
import Status from './Status.tsx'
import RegPatrol from './RegPatrol.tsx'
import { useBridges } from '../hooks/useBridges.ts'
import CalculatorDisplay from './CalculatorDisplay.tsx'

export default function Bridges() {
  const { data, isError, isPending, error } = useBridges()

  if (!data || isPending) {
    return <p>Fetching bridges from auckland...</p>
  }
  if (isError) {
    return <p>Your bridges are gone! {error.message}</p>
  }
  return (
    <>
      <h1 className="heading-1 py-10 text-center">Auckland Bridges🧌</h1>
      <div className="container">
        <ul className="grid grid-cols-3 gap-4 border-purple-900">
          {data.map((bridge) => (
            <div key={bridge.id} aria-label={bridge.name}>
              <Link to={`/bridges/${bridge.id}`}>
                <div className="w-50 h-40 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    alt={`${bridge.name} during the daytime`}
                    src={`/bridges/${bridge.imagePath}`}
                  />
                </div>
                <h2 className="heading-3">{bridge.name}</h2>
              </Link>
              <Status id={bridge.id} />
              <RegPatrol id={bridge.id} />
            </div>
          ))}
        </ul>
      </div>
    </>
  )
}
