import {useBridgeId} from '../hooks/api.ts'

export default function ViewBridge() {
  const params = useParams()
  const id = Number(params.id)
  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing orinvalid`)
  }
<<<<<<< HEAD
}0
=======
}
>>>>>>> refs/remotes/origin/8-single-bridge-view-w-data

//useBridgeId custom hook.
const bridge = useBridgeId(id)

if (bridge.isPending) {
  return ('Is Loading...')
}

if (bridge.isError) {
  return (Error)
}
