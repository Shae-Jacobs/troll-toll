import { Link } from 'react-router-dom'
import { getBridges } from '../apis/bridge.ts'
import { useQuery } from '@tanstack/react-query'

export default function Bridges() {
  const {
    data: bridges,
    error,
    isPending,
  } = useQuery({ queryKey: ['bridges'], queryFn: getBridges })

  if (error) {
    return <p>Your bridges are gone! What a massive error</p>
  }
  if (!bridges || isPending) {
    return <p>Fetching bridges from auckland...</p>
  }

  return (
    <>
      <h1>Auckland Bridges🧌</h1>
      <ul>
        {bridges.map((bridge) => (
           <Link to={`/bridges/${bridge.id}`} key={bridge.id}>
           <div>
            <h2>{bridge.name}</h2>
            </div>
            </Link>
        ))}
      </ul>
    </>
  )
}
