import request from 'superagent'
import { TollData } from '../../models/toll'
import { Toll } from '../../models/toll'

// GET /api/v1/tolls/:user/:id

export async function getUsersTollsByBridgeId(user: string, id: number) {
  const result = await request.get(`/api/v1/tolls/${user}/${id}`)

  return result.body as TollData[]
}

// POST /api/v1/tolls

export async function addToll(newToll: Toll) {
  const result = await request.post('/api/v1/tolls').send(newToll)
  console.log(result.statusCode)
  return
}
