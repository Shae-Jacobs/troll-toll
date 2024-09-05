import { useFavourites } from '../hooks/useFavourites'
import { useBridgesById } from '../hooks/useBridge'
import { useAuth0 } from '@auth0/auth0-react'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  id: number
  token: string
  onInvalidated: (id: number) => void
}

export default function AddFavourite({ onInvalidated, id, token }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const { data: bridgeData } = useBridgesById(id)
  const idBridge = bridgeData?.id

  const {
    data: favourites = [],
    isPending: favsPending,
    isError: favsIsError,
    error: favsError,
    addFav,
    deleteFav,
  } = useFavourites(token)

  const handleMutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['favourites', token],
    })
    onInvalidated(id)
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    switch (name) {
      case 'add':
        try {
          addFav.mutate(
            {
              id: Number(idBridge),
              usersToken: token,
            },
            mutationOptions,
          )
        } catch (error) {
          console.error('Error Adding Favourite')
        }
        break
      case 'delete':
        try {
          deleteFav.mutate(
            {
              id: Number(idBridge),
              usersToken: token,
            },
            mutationOptions,
          )
        } catch (error) {
          console.error('Error Adding Favourite')
        }
        break
    }
  }

  if (favsPending) {
    return <p>Checking favs...</p>
  }

  if (favsIsError) {
    return <p>Something went wrong {favsError.message}</p>
  }

  const isFavourite = !favourites.find(
    (favourite) => favourite.bridgesId === Number(idBridge),
  )

  return isFavourite ? (
    <>
      {
        <button
          name="add"
          className="primary_button mr-6"
          onClick={handleClick}
        >
          Add to favourites
        </button>
      }
    </>
  ) : (
    !isFavourite && (
      <>
        <button
          name="delete"
          className="secondary_button mr-6"
          onClick={(event) => handleClick(event)}
        >
          Unfavourite
        </button>
      </>
    )
  )
}
