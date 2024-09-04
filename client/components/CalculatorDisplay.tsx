// import { useQuery } from '@tanstack/react-query'
// import { getUsersTollsByBridgeId } from '../apis/toll'
// import { Toll, TollData } from '../../models/toll'
import { Result } from 'postcss'
import { useToll } from '../hooks/useToll'

interface Props {
  user: string
  id: number
}

//1Ȼ is 1 troll rock candy, the smallest division of currency
// 100 Rock Candies = 1 Gold Ring (AuR) : 10Ȼ = 1AuR
// 100 Gold Rings = 1 Goat (GT) : 100AuR = 1 GT

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
      <p>Total Candies: Ȼ{remainingCandies}</p>
      <p>Total Gold Rings: 💍{remainingGoldRings}</p>
      <p>Total Goats: 🐐{totalGoats}</p>
    </>
  )
}

export default CalculatorDisplay
