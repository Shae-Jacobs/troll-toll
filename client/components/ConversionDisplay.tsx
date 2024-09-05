import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  candies: number
}

function ConversionDisplay({ candies }: Props) {
  const { user } = useAuth0()
  const [remainingCandies, setRemainingCandies] = useState(
    0 as number | undefined,
  )
  const [remainingGoldRings, setRemainingGoldRings] = useState(
    0 as number | undefined,
  )
  const [totalGoats, setTotalGoats] = useState(0 as number | undefined)

  useEffect(() => {
    const totalGoldRings = Number(Math.floor(candies / 100))

    const extraCandies = Number(candies % 100)
    setRemainingCandies(extraCandies)

    setTotalGoats(Number(Math.floor(totalGoldRings / 100)))
    setRemainingGoldRings(Number(totalGoldRings % 100))
  }, [candies])

  return (
    <>
      <h3 className="heading-3">{`${user?.name}'s Earnings:`}</h3>
      <br />
      {remainingCandies !== 0 && <p>🍬 Candies: {remainingCandies}</p>}
      {remainingGoldRings !== 0 && <p>💍 Gold Rings: {remainingGoldRings}</p>}
      {totalGoats !== 0 && <p>🐐 Goats: {totalGoats}</p>}
    </>
  )
}

export default ConversionDisplay
