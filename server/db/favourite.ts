import db from './connection.ts'
import { Favourite } from '../../models/favourite'

// export interface Favourite {
//   bridgesId: number
//   usersToken: string
// }

// export interface FavouriteData extends Favourite {
//   id?: number
// }

export async function getFavourites(usersToken: string): Promise<Favourite[]> {
  return db('favourites')
    .where('users_token', usersToken)
    .select(
      'favourites.bridges_id as bridgesId',
      'favourites.users_token as usersToken',
      'favourites.id',
    )
}

export async function getFavouriteById(
  id: number,
  usersToken: string,
): Promise<Favourite> {
  return db('favourites')
    .where({ id })
    .where('users_token', usersToken)
    .first(
      'favourites.bridges_id as bridgesId',
      'favourites.users_token as usersToken',
      'favourites.id',
    )
}

export async function deleteFavouriteById(
  id: number,
  usersToken: string,
): Promise<void> {
  return await db('favourites')
    .where({ id })
    .where('users_token', usersToken)
    .delete()
}

export async function addFavourite(
  newFave: Favourite,
  usersToken: string,
): Promise<Favourite> {
  return db('favourites').where('users_token', usersToken).insert({
    users_token: newFave.usersToken,
    bridges_id: newFave.bridgesId,
  })
}
