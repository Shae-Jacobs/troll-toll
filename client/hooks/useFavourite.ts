import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/favourite'
import { Favourite } from '../../models/favourite'

export function useFavourites(usersToken: string) {
  const query = useQuery({
    queryKey: ['favourites'],
    queryFn: () => API.getFavourites(usersToken),
  })
  return query
}

export function useFavouritesMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favourites'],
      })
    },
  })

  return mutation
}

export function useAddFavourites() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newFave: Favourite) => API.addFavourite(newFave),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] })
    },
  })
}

// export function useAddFavourites() {
//   return useFavouritesMutation(API.setFavourite)
// }
