import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToll } from '../apis/toll'
import { Toll } from '../../models/toll'

export function useAddToll() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newToll: Toll) => addToll(newToll),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tolls'] })
    },
  })
}
