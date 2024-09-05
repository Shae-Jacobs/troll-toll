import { useAddFavourites } from '../hooks/useFavourites'

function AddFavourite() {
  const addFave = useAddFavourites()
  const handleClick = async () => {
    try {
      await addFave.mutate({
        usersToken: '0auth|4321',
        bridgesId: 3,
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
