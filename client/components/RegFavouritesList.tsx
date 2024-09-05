import { useFavourites } from '../hooks/useFavourites'
import RegFavouritesCard from './RegFavouritesCard'

interface Props {
  token: string
  id: number | null
}

export default function RegFavouritesList({ token, id }: Props) {
  const {
    data: favourites = [],
    isPending: favsPending,
    isError: favsIsError,
    error: favsError,
  } = useFavourites(token)

  if (favsPending) {
    return <p>Checking Status...</p>
  }

  if (favsIsError) {
    return <p>Something went wrong {favsError.message}</p>
  }

  return (
    <ul className="grid grid-cols-3 gap-4 border-purple-900">
      {favourites.map(
        (favourite) =>
          !(favourite.bridgesId === id) && (
            <RegFavouritesCard
              key={favourite.bridgesId}
              id={favourite.bridgesId}
            />
          ),
      )}
    </ul>
  )
}
