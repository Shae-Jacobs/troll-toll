import {useBridgeId} from '../hooks/api.ts'

export default function ViewBridge() {
  const params = useParams()
  const id = NUmber(params.id)
  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing orinvalid`)
  }
}0

//useBridgeId custom hook.
const bridge = useBridgeId(id)

if (bridge.isPending) {
  return (Is Loading...)
}

if (bridge.isError) {
  return (Error)
}
