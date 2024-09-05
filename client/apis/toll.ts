import request from 'superagent'
import { TollData } from '../../models/toll'
import { Toll } from '../../models/toll'

// GET /api/v1/tolls/:user/:id

export async function getUsersTollsByBridgeId(
  user: string,
  id: number,
  jwtToken: string,
) {
  const result = await request
    .get(`/api/v1/tolls/${user}/${id}`)
    .set('Authorization', `Bearer ${jwtToken}`)

  return result.body as TollData[]
}

// POST /api/v1/tolls

export async function addToll(newToll: Toll, jwtToken: string) {
  const result = await request
    .post('/api/v1/tolls')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(newToll)

  console.log(result.statusCode)
  return
}
