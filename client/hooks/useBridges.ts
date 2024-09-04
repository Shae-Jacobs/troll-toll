import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/bridge'

export function useBridges() {
  const query = useQuery({
    queryKey: ['bridges'],
    queryFn: () => API.getBridges(),
  })
  return query
}

export function useBridgesById(id: number) {
  const query = useQuery({
    queryKey: ['bridge', id],
    queryFn: () => API.getBridgesById(id),
  })
  return {
    ...query,
    updateStatus: useUpdateStatus(),
  }
}

export function useBridgesMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bridges', 'status'],
      })
    },
  })

  return mutation
}

// Update Mutation Hooks
export function useUpdateStatus() {
  return useBridgesMutation(API.setStatusById)
}
