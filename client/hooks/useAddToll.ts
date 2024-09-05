import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToll } from '../apis/toll'
import { Toll } from '../../models/toll'
import { useAuth0 } from '@auth0/auth0-react'

export async function useAddToll(id: number) {
  const { getAccessTokenSilently } = useAuth0()
  const jwtToken = await getAccessTokenSilently()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newToll: Toll) => addToll(newToll, jwtToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tolls', id] })
    },
  })
}
