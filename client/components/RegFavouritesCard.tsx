import { Link } from 'react-router-dom'
import Status from './Status.tsx'
import RegPatrol from './RegPatrol.tsx'
import { useBridgesById } from '../hooks/useBridges.ts'

interface Props {
  id: number
}

export default function RegFavouritesCard({ id }: Props) {
  const { data: bridge, isError, isPending, error } = useBridgesById(id)

  if (!bridge || isPending) {
    return <p>Fetching bridge from auckland...</p>
  }

  if (isError) {
    return <p>Your bridge is gone! {error.message}</p>
  }

  return (
    <>
      <div aria-label={bridge.name}>
        <Link to={`/bridges/${bridge.id}`}>
          <img src={bridge.imagePath} alt={bridge.name} />
          <h2>{bridge.name}</h2>
        </Link>
        <Status id={bridge.id} />
        <RegPatrol id={bridge.id} />
      </div>
    </>
  )
}
