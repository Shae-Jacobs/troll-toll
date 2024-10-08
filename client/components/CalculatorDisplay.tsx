import { useToll } from '../hooks/useToll'
import { useState, useEffect } from 'react'
import ConversionDisplay from './ConversionDisplay'
import SetToll from './SetToll'

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

  if (candiesTotal == 0) {
    return (
      <>
        <div className="calculatorContainer md m-4 mx-auto grid min-h-20 w-96 justify-center rounded-lg bg-accent-2 p-4 px-4">
          <div className="rounded-md bg-accent-1 p-4">
            <h3 className="heading-3">No Earnings Here Yet</h3>
          </div>
        </div>
        <SetToll id={id} />
      </>
    )
  } else {
    return (
      <>
        <div className="calculatorContainer md m-4 mx-auto grid min-h-60 w-96 justify-center rounded-lg bg-accent-2 p-4 px-4">
          <div className="rounded-md bg-accent-1 p-4">
            <ConversionDisplay candies={candiesTotal} />
          </div>
          <br />
          <div className="rounded-md bg-accent-1 p-4">
            <p className="paragraph">
              <span className="emoji">🧮</span> Total Candies: Ȼ{candiesTotal}
            </p>
          </div>
        </div>
        <SetToll id={id} />
      </>
    )
  }
}

export default CalculatorDisplay
