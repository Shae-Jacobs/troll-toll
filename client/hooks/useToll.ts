import { useQuery } from '@tanstack/react-query'
import { getUsersTollsByBridgeId } from '../apis/toll'
import { useAuth0 } from '@auth0/auth0-react'
// import { TollData } from '../../models/toll'

export function useToll(user: string, id: number) {
  const { getAccessTokenSilently } = useAuth0()

  return useQuery({
    queryFn: async () => {
      const jwtToken = await getAccessTokenSilently()
      const result = await getUsersTollsByBridgeId(user, id, jwtToken)

      return result
    },
    queryKey: ['tolls', id],
  })
}
