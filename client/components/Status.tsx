import { useAuth0 } from '@auth0/auth0-react'
import { useBridgesById } from '../hooks/useBridge'

interface Props {
  id: number
}

export default function Status({ id }: Props) {
  // const { getAccessTokenSilently, getIdTokenClaims } = useAuth0()
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
        <div
          className="secondary_button mr-6 flex flex-row"
          aria-label="Active"
        >
          {bridges.activeByUsers === user?.sub
            ? 'Currently Patrolling '
            : 'Active '}
          <div className="z-2 mx-1 my-2 h-4 w-4 rounded-full border-2 border-white bg-green-400"></div>
        </div>
      )}

      {!bridges.activeByUsers && (
        <div
          className="secondary_button mr-6 flex flex-row"
          aria-label="Inactive"
        >
          Inactive{' '}
          <div className="z-2 mx-1 my-2 h-4 w-4 rounded-full border-2 border-white bg-gray-400"></div>
        </div>
      )}
    </>
  )
}
