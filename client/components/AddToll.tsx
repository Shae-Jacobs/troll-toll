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
      addMutation.mutate({
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
      <div className="calculatorContainer md m-4 mx-auto grid w-96 justify-center p-4 px-4">
        <button
          className="button rounded-lg bg-accent-5 px-20 py-2 text-white"
          onClick={handleClick}
        >
          💰 Add Toll 💰
        </button>
      </div>
    </>
  )
}

export default AddToll
