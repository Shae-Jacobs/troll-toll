import { useQuery } from '@tanstack/react-query'
import { getUsersTollsByBridgeId } from '../apis/toll'
// import { TollData } from '../../models/toll'

export function useToll(user: string, id: number) {
  return useQuery({
    queryFn: async () => {
      const result = await getUsersTollsByBridgeId(user, id)
      return result
    },
    queryKey: ['tolls', id],
  })
}
