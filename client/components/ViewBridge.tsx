import { useParams } from "react-router-dom"
import { getBridge } from '../apis/bridge.ts'
import { useQuery } from '@tanstack/react-query'


export default function ViewBridge() {
  const params = useParams()
  const id = Number(params.id)
  const {
    data: bridge,
    error,
    isPending,
  } = useQuery({ queryKey: ['bridge'], queryFn:() => getBridge(id) })


  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing orinvalid`)
  }



if (isPending) {
   return <p>Is Loading...</p>
}

if (error) {
 return <p> Bridge lost on the way </p>
}


return (
<>
<div>
      <h2>{`${bridge.name}`}</h2>
      <p><ul>
      <li>{`${bridge.name}`}</li>
      <li>{`${bridge.location}`}</li>
      <li>{`${bridge.type}`}</li>
      <li>{`${bridge.yearBuilt}`}</li>
      <li>{`${bridge.lengthMeters}`}</li>
      <li>{`${bridge.lanes}`}</li>
      </ul>
      </p>
      </div>
      </>
)
}
