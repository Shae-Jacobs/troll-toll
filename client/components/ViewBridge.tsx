import { useParams } from "react-router-dom"

export default function ViewBridge() {
  const params = useParams()
  const id = Number(params.id)
  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing orinvalid`)
  }



//useBridgeId custom hook.
// const bridge = useBridgeId(id)

// if (bridge.isPending) {
//   return ('Is Loading...')
// }

// if (bridge.isError) {
//   return (Error)
// }

return <p>Single Bridge</p>
}