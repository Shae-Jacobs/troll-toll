import { Link, useNavigate } from 'react-router-dom'
import Status from './Status.tsx'
import RegPatrol from './RegPatrol.tsx'
import { useBridgesById } from '../hooks/useBridge.ts'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  id: number
}

export default function RegFavouritesCard({ id }: Props) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    data: bridge,
    isError,
    isPending,
    error,
    refetch,
  } = useBridgesById(id)

  const handleInvalidate = (id: number) => {
    console.log('Invalidating bridges query and refetching data.')
    queryClient.invalidateQueries({
      queryKey: ['bridges'],
    })
    refetch()

    navigate(`/bridges/${id}`)
  }
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
          <img
            className="max-h-md w-full object-cover"
            alt={`${bridge.name} during the daytime`}
            src={`/bridges/${bridge.imagePath}`}
          />
          <h2 className="heading-3">{bridge.name}</h2>
        </Link>
        <div className="flex flex-row gap-1 py-2">
          <Status id={bridge.id} />
          <RegPatrol id={bridge.id} onInvalidated={handleInvalidate} />
        </div>
      </div>
    </>
  )
}
