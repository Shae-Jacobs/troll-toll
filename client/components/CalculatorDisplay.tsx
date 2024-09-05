import { useToll } from '../hooks/useToll'
import { useState, useEffect } from 'react'
import ConversionDisplay from './ConvertionDisplay'

interface Props {
  user: string
  id: number
}

function CalculatorDisplay({ user, id }: Props) {
  const [candiesTotal, setCandiesTotal] = useState(0 as number)

  const { data, isPending, isError, error } = useToll(user, id)

  useEffect(() => {
    if (data) {
      const result = data?.map((candies) => candies.candies)
      const reduced = result?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
      setCandiesTotal(reduced)
    }
  }, [data])

  if (isPending) {
    return <p>... is Pending</p>
  }

  if (isError || !data) {
    return <p>Failed {String(error)}</p>
  }

  return (
    <>
      <p>Total Candies: Ȼ{candiesTotal}</p>
      <br />
      <ConversionDisplay candies={candiesTotal} />
      <br />
    </>
  )
}

export default CalculatorDisplay
