import { useParams } from 'react-router-dom'
import { useBridgesById } from '../hooks/useBridge'
import Status from './Status.tsx'
import RegPatrol from './RegPatrol.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import CalculatorDisplay from './CalculatorDisplay.tsx'
import IsAuthenticated from './IsAuthenticated.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AddFavourite from './RegAddFavourites.tsx'
import { useEffect, useState, useCallback } from 'react'
import Map from './Map.tsx'

export default function ViewBridge() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const { user } = useAuth0()
  const params = useParams()
  const id = Number(params.id)
  const [token, setToken] = useState('wait')

  const { data: bridge, error, isPending, refetch } = useBridgesById(id)

  const fetchToken = useCallback(async () => {
    try {
      const tokenId = await getAccessTokenSilently()
      setToken(tokenId)
      return tokenId
    } catch {
      setToken('undefined')
      return 'undefined'
    }
  }, [getAccessTokenSilently])

  useEffect(() => {
    if (token === 'wait') {
      fetchToken()
    }
  }, [fetchToken, token])

  const handleInvalidate = (id: number) => {
    console.log('Invalidating bridges query and refetching data.')
    queryClient.invalidateQueries({
      queryKey: ['bridge', id],
    })
    refetch()
  }

  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing or invalid`)
  }

  if (isPending) {
    return <p>Is Loading...</p>
  }

  if (error) {
    return <p> Bridge lost on the way </p>
  }

  return (
    <>
      <div className="custom_flex container mx-auto mt-8">
        <div className="w-1/3 px-8">
          <img
            className="h-auto w-full"
            alt={`${bridge.name} during the daytime`}
            src={`/bridges/${bridge.imagePath}`}
          />
        </div>

        <div className="flex w-1/3 flex-col">
          <div>
            <h2 className="heading-2 pb-6">{`${bridge.name}`}</h2>
          </div>

          <div className="flex items-center pb-6">
            <div className="flex flex-row gap-1 py-2">
              <Status id={bridge.id} />
              <IsAuthenticated>
                <RegPatrol id={bridge.id} onInvalidated={handleInvalidate} />
              </IsAuthenticated>
              <IsAuthenticated>
                <AddFavourite
                  token={token}
                  id={bridge.id}
                  onInvalidated={handleInvalidate}
                />
              </IsAuthenticated>
            </div>
          </div>

          <div>
            <p>
              <span className="font-bold">Bridge Type:</span>
              {` ${bridge.type}`}
            </p>
            <p>
              <span className="font-bold">Year Built:</span>
              {` ${bridge.yearBuilt}`}
            </p>
            <p>
              <span className="font-bold">Length:</span>
              {` ${bridge.lengthMeters}M`}
            </p>
            <p>
              <span className="font-bold">Car Lanes:</span>
              {` ${bridge.lanes}`}
            </p>
          </div>
        </div>
      </div>
      <IsAuthenticated>
        {user && bridge.activeByUsers === user.sub && (
          <CalculatorDisplay user={user.sub || ''} id={bridge.id} />
        )}
      </IsAuthenticated>
      <Map />
    </>
  )
}
