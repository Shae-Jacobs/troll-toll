import request from 'superagent'
import { Bridge } from '../../models/bridge.ts'

const bridgeURL = '/api/v1/bridges'

export async function getBridges(): Promise<Bridge[]> {
  const res = await request.get(bridgeURL)
  return res.body
}
<<<<<<< HEAD

export async function getBridgesById(id: number): Promise<Bridge> {
  const res = await request.get(bridgeURL + `/${id}`)
  return res.body
}

// Updates Functions //
interface StatusFunction {
  id: number
  usersToken: string
}

export async function setStatusById({
  id,
  usersToken,
}: StatusFunction): Promise<void> {
  await request
    .patch(bridgeURL + id)
    .set('Authorization', `Bearer ${usersToken}`)
}
||||||| merged common ancestors
=======

export async function getBridge(id: number): Promise<Bridge> {
  const res = await request.get(`${bridgeURL}${id}`)
  return res.body
}
>>>>>>> 249f9b3fba777a33d2201e5962f2a2110cfbe05c
