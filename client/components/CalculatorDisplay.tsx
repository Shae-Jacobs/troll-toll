// import { useQuery } from '@tanstack/react-query'
// import { getUsersTollsByBridgeId } from '../apis/toll'
// import { Toll, TollData } from '../../models/toll'
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

  return <p>Calculate Toll!</p>
}

export default CalculatorDisplay
