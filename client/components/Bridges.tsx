import { Link } from 'react-router-dom'
import Status from './Status.tsx'
import RegPatrol from './RegPatrol.tsx'
import { useBridges } from '../hooks/useBridges.ts'
import { useQueryClient } from '@tanstack/react-query'

export default function Bridges() {
  const { data, isError, isPending, error, refetch } = useBridges()
  const queryClient = useQueryClient()

  const handleInvalidate = () => {
    console.log('Invalidating bridges query and refetching data.')
    queryClient.invalidateQueries({
      queryKey: ['bridges'],
    })
    refetch()
  }

  if (!data || isPending) {
    return <p>Fetching bridges from Auckland...</p>
  }
  if (isError) {
    return <p>Your bridges are gone! {error.message}</p>
  }

  return (
    <>
      <h1>Auckland Bridges 🧌</h1>
      <ul>
        {data.map((bridge) => (
          <li key={bridge.id} aria-label={bridge.name}>
            <Link to={`/bridges/${bridge.id}`}>
              <h2>{bridge.name}</h2>
              <img
                className="max-w-md"
                alt={`${bridge.name} during the daytime`}
                src={`/bridges/${bridge.imagePath}`}
              />
            </Link>
            <div className="flex flex-row px-4 py-2">
              <Status id={bridge.id} />
              <RegPatrol id={bridge.id} onInvalidated={handleInvalidate} />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
