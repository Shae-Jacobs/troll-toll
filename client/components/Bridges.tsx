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
          <div key={bridge.id}>
            <h2>{bridge.name}</h2>
            <Link to={`/bridges/${bridge.id}`}></Link>
          </div>
        ))}
      </ul>
    </>
  )
}
