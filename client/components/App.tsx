import Bridges from './Bridges'
import CalculatorDisplay from './CalculatorDisplay'
const id = 1
function App() {
  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Troll Toll Calculator</h1>
        {/* <Bridges /> */}
        <CalculatorDisplay user="0auth|1234" id={id} />
      </div>
    </>
  )
}

export default App
