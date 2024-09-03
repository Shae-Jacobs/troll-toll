import connection from "./connection";
import { Toll, TollData } from "../../models/toll";

const db = connection

export function getUsersTollsByBridgeId(usersToken: string, bridgesId: number): Promise<TollData[]> {
return db ('tolls').where({bridgesId}).where({usersToken}).select('tolls.candies as candies')

}

export function addToll(newToll: Toll) {
  return db ('tolls').insert({
    usersToken: newToll.usersToken,
    candies: newToll.candies,
    timeStamp: newToll.timeStamp,
    bridgesId: newToll.bridgesId
  })
}