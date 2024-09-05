import db from './connection.ts'
import { Favourite } from '../../models/favourite'

export async function getFavourites(usersToken: string): Promise<Favourite[]> {
  return await db('favourites')
    .where('users_token', usersToken)
    .select(
      'favourites.bridges_id as bridgesId',
      'favourites.users_token as usersToken',
      'favourites.id',
    )
}

export async function getFavouriteById(
  usersToken: string,
  id: number,
): Promise<Favourite> {
  return await db('favourites')
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

export async function addFavourite(id: number,
  usersToken: string,
): Promise<Favourite> {
  return  await db('favourites').insert({
    users_token: usersToken,
    bridges_id: id,
  })
}
//.where('users_token', usersToken <<Took this part out for now
