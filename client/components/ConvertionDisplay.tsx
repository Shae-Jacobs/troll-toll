import { useState, useEffect } from 'react'

interface Props {
  candies: number
}

function ConversionDisplay({ candies }: Props) {
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
      <h2>with conversion, you have:</h2>
      <p>Candies: Ȼ{remainingCandies}</p>
      <p>Gold Rings: 💍{remainingGoldRings}</p>
      <p>Goats: 🐐{totalGoats}</p>
    </>
  )
}

export default ConversionDisplay
