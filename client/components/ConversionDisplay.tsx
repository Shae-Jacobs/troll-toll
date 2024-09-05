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
      <h3 className="heading-3">{`${user?.name}'s earnings:`}</h3>
      <p>Candies: Ȼ{remainingCandies}</p>
      <p>Gold Rings: 💍{remainingGoldRings}</p>
      <p>Goats: 🐐{totalGoats}</p>
    </>
  )
}

export default ConversionDisplay
