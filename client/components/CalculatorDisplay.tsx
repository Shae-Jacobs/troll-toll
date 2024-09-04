import { useToll } from '../hooks/useToll'

interface Props {
  user: string
  id: number
}

function CalculatorDisplay({ user, id }: Props) {
  const { data, isPending, isError, error } = useToll(user, id)

  if (isPending) {
    return <p>... is Pending</p>
  }

  if (isError || !data) {
    return <p>Failed {String(error)}</p>
  }

  //map of candies object and extract just the candies

  function gettingCandies() {
    const result = data?.map((candies) => candies.candies)

    const reduced = result?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

    return reduced
  }

  const candiesTotal = gettingCandies() as number

  const totalGoldRings = Number(Math.floor(candiesTotal / 100))
  const remainingCandies = Number(candiesTotal % 100)

  const totalGoats = Number(Math.floor(totalGoldRings / 100))
  const remainingGoldRings = Number(totalGoldRings % 100)

  return (
    <>
      <p>Total Candies: Ȼ{candiesTotal}</p>
      <br />
      <h2>with conversion, you have:</h2>
      <p>Candies: Ȼ{remainingCandies}</p>
      <p>Gold Rings: 💍{remainingGoldRings}</p>
      <p>Goats: 🐐{totalGoats}</p>
      <br />
    </>
  )
}

export default CalculatorDisplay
