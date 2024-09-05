import { useAddToll } from '../hooks/useAddToll'

interface Props {
  id: number
  candies: number
}

function AddToll({ id, candies }: Props) {
  const user = '0auth|1234'

  const addMutation = useAddToll(id)

  const handleClick = async () => {
    try {
      await addMutation.mutate({
        usersToken: user,
        candies: candies,
        timeStamp: Date.now().toString(),
        bridgesId: id,
      })
    } catch (error) {
      console.error('Error Adding Toll')
    }
  }

  return (
    <>
      <button onClick={handleClick} className="border border-gray-500 p-2">
        Add New Toll Now
      </button>
    </>
  )
}

export default AddToll
