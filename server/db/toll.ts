import connection from './connection'
import { Toll, TollData } from '../../models/toll'

const db = connection

export function getUsersTollsByBridgeId(
  usersToken: string,
  bridgesId: number,
): Promise<TollData[]> {
  return db('tolls')
    .where('bridges_id', bridgesId)
    .where('users_token', usersToken)
    .select('tolls.candies as candies')
}

export function addToll(newToll: Toll) {
  return db('tolls').insert({
    users_token: newToll.usersToken,
    candies: newToll.candies,
    time_stamp: newToll.timeStamp,
    bridges_id: newToll.bridgesId,
  })
}
