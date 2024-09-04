export interface Toll {
  usersToken: string
  candies: number
  timeStamp: string
  bridgesId: number
}

export interface TollData extends Toll {
  id: number
}
