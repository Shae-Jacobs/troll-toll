import { useAuth0 } from '@auth0/auth0-react'
import { useBridgesById } from '../hooks/useBridges'

interface Props {
  id: number
}

export default function Status({ id }: Props) {
  const { data: bridges, isPending, isError, error } = useBridgesById(id)
  const { user } = useAuth0()
  if (isError) {
    return <p>Something went wrong {error.message}</p>
  }

  if (isPending) {
    return <p>Checking Status...</p>
  }

  return (
    <>
      {bridges.activeByUsers && (
        <div className="flex flex-row py-2" aria-label="Active">
          Active{' '}
          <div className="z-2 mx-1 my-2 h-4 w-4 rounded-full border-2 border-white bg-green-400"></div>
        </div>
      )}
      {bridges.activeByUsers === user?.sub && (
        <div className="flex flex-row py-2" aria-label="Active">
          {user?.name}{' '}
        </div>
      )}
      {!bridges.activeByUsers && (
        <div className="flex flex-row px-4 py-2" aria-label="Inactive">
          Inactive{' '}
          <div className="z-2 mx-1 my-2 h-4 w-4 rounded-full border-2 border-white bg-gray-400"></div>
        </div>
      )}
    </>
  )
}
