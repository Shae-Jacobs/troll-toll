// import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0 } from '@auth0/auth0-react'
import { useBridgesById } from '../hooks/useBridges'
interface Props {
  id: number
}

export default function RegPatrol({ id }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const {
    data: bridges,
    isPending,
    isError,
    error,
    updateStatus,
  } = useBridgesById(id)

  if (isPending) {
    return <p>Checking Status...</p>
  }

  if (isError) {
    return <p>Something went wrong {error.message}</p>
  }

  const handleClick = async () => {
    if (bridges.activeByUsers === null || undefined) {
      console.error('bridge already active!')
      return 'bridge already active'
    }

    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })

    updateStatus.mutate({ id: id, usersToken: token })
  }

  return (
    <>
      {!bridges.activeByUsers && (
        <button onClick={handleClick} aria-label="status-button" className="">
          Patrol Bridge
        </button>
      )}
    </>
  )
}
