// import { useAuth0 } from '@auth0/auth0-react'
import { useBridgesById } from '../hooks/useBridges'

interface Props {
  id: number
}

export default function RegPatrol({ id }: Props) {
  // const { getAccessTokenSilently, getIdTokenClaims } = useAuth0()
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
    // const tokenId = await getIdTokenClaims()
    // if (bridges.activeByUsers === tokenId?.sub) {
    //   console.error('bridge already active!')
    //   return 'bridge already active'
    // }

    const token = 'auth0|1234'

    // const token = await getAccessTokenSilently().catch(() => {
    //   console.error('Login Required')
    //   return 'undefined'
    // })

    updateStatus.mutate({ id: id, usersToken: token })
  }

  return (
    <>
      {!bridges.activeByUsers && (
        <button onClick={handleClick}>Patrol Bridge</button>
      )}
    </>
  )
}
