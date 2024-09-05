import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/favourite'

export function useFavourites(usersToken: string) {
  const query = useQuery({
    queryKey: ['favourites', usersToken],
    queryFn: () => API.getFavourites(usersToken),
  })
  return {
    ...query,
    addFav: useAddFavourites(),
    deleteFav: useDeleteFavourites(),
  }
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
  return useFavouritesMutation(API.addFavourite)
}

export function useDeleteFavourites() {
  return useFavouritesMutation(API.deleteFavouritesById)
}
