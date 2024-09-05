// import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0 } from '@auth0/auth0-react'
import { useBridgesById } from '../hooks/useBridge'
import { useQueryClient } from '@tanstack/react-query'
interface Props {
  id: number
  onInvalidated: (id: number) => void
}

export default function RegPatrol({ onInvalidated, id }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const {
    data: bridges,
    isPending,
    isError,
    error,
    updateStatus,
  } = useBridgesById(id)

  const handleMutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['bridge', id],
    })
    onInvalidated(id)
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
  }

  if (isPending) {
    return <p>Checking Status...</p>
  }

  if (isError) {
    return <p>Something went wrong {error.message}</p>
  }

  const handleClick = async () => {
    if (bridges.activeByUsers !== null || undefined) {
      console.error('bridge already active!')
      return 'bridge already active'
    }

    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })

    updateStatus.mutate({ id: id, usersToken: token }, mutationOptions)
  }

  return (
    <>
      {!bridges.activeByUsers && (
        <button
          className="secondary_button mr-6"
          onClick={handleClick}
          aria-label="status-button"
        >
          Patrol Bridge
        </button>
      )}
    </>
  )
}
