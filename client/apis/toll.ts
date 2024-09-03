import request from 'superagent'
import { Toll, TollData } from '../../models/toll'

// GET /api/v1/tolls/:user/:id

export async function getUsersTollsByBridgeId(user: string, id: number) {
  const result = await request.get(`/api/v1/tolls/${user}/${id}`)
  return result.body as TollData[]
}
