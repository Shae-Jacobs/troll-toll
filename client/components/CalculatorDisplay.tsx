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

  const candies = gettingCandies()

  const convertCandiestoRings = (candies: number) => {
    let goldRings = 0
    const goats = 0
    const result = candies / 100
    const calc = String(result).split('.')
    console.log(calc)
    goldRings = calc[0]
    console.log(result)
    console.log('gold rings: ', goldRings)
    return result
  }

  convertCandiestoRings(candies as number)

  return (
    <>
      {/* <p>Calculate Toll!</p> */}
      <p>Total Candies: Ȼ{gettingCandies()}</p>
    </>
  )
}

export default CalculatorDisplay
