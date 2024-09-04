// import Bridges from './Bridges'
import CalculatorDisplay from './CalculatorDisplay'
import AddToll from './AddToll'
const id = 1
const candies = 5
function App() {
  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Troll Toll Calculator</h1>
        {/* <Bridges /> */}
        <CalculatorDisplay user="0auth|1234" id={id} />
        <AddToll id={id} candies={candies} />
      </div>
    </>
  )
}

export default App
