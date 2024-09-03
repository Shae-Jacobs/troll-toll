import db from './connection.ts'
import { Favourite } from '../../models/favourite'

export async function getFavourites(userToken: string): Promise<Favourite[]> {
  return db('favourites').where('users_token', userToken).select('*')
}

export async function getFavouriteById(
  id: number,
  userToken: string,
): Promise<Favourite> {
  return db('favourites')
    .where({ id })
    .where('users_token', userToken)
    .select('*')
    .first()
}

export async function deleteFavouriteById(id: number, userToken: string) {
  return db('favourites')
    .where({ id })
    .where('users_token', userToken)
    .first()
    .delete()
}

export async function addFavourite(newFave: Favourite, userToken: string) {
  return db('favourites').where('users_token', userToken).insert({
    users_token: newFave.userToken,
    bridges_id: newFave.bridgeId,
  })
}
