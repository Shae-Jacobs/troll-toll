import { useAddFavourites } from '../hooks/useFavourites'
import { useBridgesById } from '../hooks/useBridge'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { Favourite } from '../../models/favourite'
import { useQueryClient } from '@tanstack/react-query'
import { getFavourites } from '../apis/favourite'

type FormState = {
  favourites: Favourite[]
}

interface Props {
  id: number
  onInvalidated: (id: number) => void
}

function AddFavourite({ onInvalidated, id }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const addFave = useAddFavourites()
  const { data: bridgeData } = useBridgesById(id)
  const idBridge = bridgeData?.id
  const [form, setForm] = useState<FormState>({
    favourites: [] as Favourite[],
  })

  useEffect(() => {
    const checkUserToken = async () => {
      const token = await getAccessTokenSilently().catch(() => {
        console.error('Login Required')
        return 'undefined'
      })
      if (form.favourites == ([] as Favourite[])) {
        const query = await getFavourites(token)
        console.log(query)
        setForm({ favourites: query })
      }
    }

    checkUserToken()
  }, [form.favourites, getAccessTokenSilently])

  const handleMutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['favourites'],
    })
    onInvalidated(id)
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
  }

  const handleClick = async () => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    try {
      addFave.mutate(
        {
          id: Number(idBridge),
          usersToken: token,
        },
        mutationOptions,
      )
    } catch (error) {
      console.error('Error Adding Favourite')
    }
  }

  return (
    <>
      <button
        className="button bg-accent-1 rounded-lg px-4 py-2"
        onClick={handleClick}
      >
        Add to favourites
      </button>
    </>
  )
}
export default AddFavourite
