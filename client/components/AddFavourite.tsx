import { useParams } from 'react-router-dom'
import { useAddFavourites } from '../hooks/useFavourites'
import { useBridgesById } from '../hooks/useBridges'
import { useAuth0 } from '@auth0/auth0-react'

function AddFavourite() {
  const { user } = useAuth0()
  const addFave = useAddFavourites()
  const params = useParams()
  const id = Number(params.id)
  const bridgeData = useBridgesById(id)
  const idBridge = bridgeData?.data?.id

  const handleClick = async () => {
    try {
      addFave.mutate({
        usersToken: String(user?.sub),
        bridgesId: Number(idBridge),
      })
    } catch (error) {
      console.error('Error Adding Favourite')
    }
  }
  return (
    <div>
      <button
        className="button bg-accent-1 rounded-lg px-4 py-2"
        onClick={handleClick}
      >
        Add to favourites
      </button>
    </div>
  )
}

export default AddFavourite
