import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/favourite'

export function useFavourites(usersToken: string) {
  const query = useQuery({
    queryKey: ['favourites'],
    queryFn: () => API.getFavourites(usersToken),
  })
  return query
}
