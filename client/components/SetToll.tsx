import { useState, ChangeEvent } from 'react'
import AddToll from './AddToll'

interface Props {
  id: number
}

function SetToll({ id }: Props) {
  const [tollValue, setTollValue] = useState(5 as number)

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    setTollValue(Number(value))
  }

  return (
    <>
      <form
        className="setValueContainermd m-4 mx-auto grid min-h-60 w-96 justify-center rounded-lg bg-accent-2 p-4 px-4"
        onSubmit={(evt) => evt.preventDefault()}
        aria-label="Toll Value"
      >
        <div>
          <label htmlFor="name">Set Your Toll Value: </label>
          <input
            className="form"
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
        <AddToll id={id} candies={tollValue} />
      </form>
    </>
  )
}

export default SetToll
