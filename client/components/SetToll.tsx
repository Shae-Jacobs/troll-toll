import { useState } from 'react'
import AddToll from './AddToll'

interface Props {
  id: number
}

function SetToll({ id }: Props) {
  const [tollValue, setTollValue] = useState(null as number | null)

  // const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = evt.currentTarget
  //   setTollValue(Number(value))
  // }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Check if the value is empty, in which case set it to null
    if (value === '' && name === 'toll') {
      setTollValue(null)
      return
    }

    if (value === '' && !(name === 'toll')) {
      setTollValue(Number(value))
      return
    }

    if (name === 'toll') {
      // Convert the value to a number
      const numberValue = Number(value)
      // Check if the value is a number and within the valid range
      if (!isNaN(numberValue) && numberValue >= 1 && numberValue <= 100000000) {
        setTollValue(numberValue)
      } else {
        // If invalid, just don't update the state, or you could show an error
        setTollValue(null)
      }
    }
  }

  return (
    <>
      <form
        className="setValueContainer md m-4 mx-auto grid min-h-60 w-[28rem] justify-center rounded-lg bg-accent-2 p-4 px-4"
        onSubmit={(evt) => evt.preventDefault()}
        aria-label="Toll Value"
      >
        <div className="flex flex-col items-center space-y-3">
          <label htmlFor="name" className="text-2xl font-bold">
            Set Your Toll Value:{' '}
          </label>
          <input
            className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 text-center shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            name="toll"
            id="toll"
            value={tollValue === null ? '' : tollValue} // Handle null value
            placeholder="5"
            min="5"
            max="1000000000"
            step="1" // Optional: step value for better UX
            onChange={onChange}
          />
        </div>
        <AddToll id={id} candies={tollValue || 5} />
      </form>
    </>
  )
}

export default SetToll
