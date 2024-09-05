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
      <h1>Auckland Bridges🧌</h1>
      <ul>
        {data.map((bridge) => (
          <div key={bridge.id} aria-label={bridge.name}>
            <Link to={`/bridges/${bridge.id}`}>
              <h2>{bridge.name}</h2>
              <img
                className="max-w-md"
                alt={`${bridge.name} during the daytime`}
                src={`/bridges/${bridge.imagePath}`}
              />
            </Link>
            <CalculatorDisplay user={'0auth|1234'} id={bridge.id} />
            <Status id={bridge.id} />
            <RegPatrol id={bridge.id} />
          </div>
        ))}
      </ul>
    </>
  )
}
