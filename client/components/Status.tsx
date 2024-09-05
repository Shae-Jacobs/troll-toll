import { useBridgesById } from '../hooks/useBridges'

interface Props {
  id: number
}

export default function Status({ id }: Props) {
  // const { getAccessTokenSilently, getIdTokenClaims } = useAuth0()
  const { data: bridges, isPending, isError, error } = useBridgesById(id)

  if (isError) {
    return <p>Something went wrong {error.message}</p>
  }

  if (isPending) {
    return <p>Checking Status...</p>
  }

  return (
    <>
      {bridges.activeByUsers && (
        <div className="flex space-x-2  " aria-label="Active">
          Active{' '}
          <div className="z-2 my-1 h-4 w-4 rounded-full border-2 border-white bg-green-400"></div>
        </div>
      )}
      {!bridges.activeByUsers && (
        <div className="flex space-x-2  " aria-label="Inactive">
          Inactive{' '}
          <div className="z-2 my-1 h-4 w-4 rounded-full border-2 border-white bg-gray-400"></div>
        </div>
      )}
    </>
  )
}
