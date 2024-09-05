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
  const favCheck = await db('favourites')
    .where('favourites.users_token', usersToken)
    .andWhere('favourites.bridges_id', id)
    .select()

  if (!favCheck) {
    throw new Error('Favourite already deleted')
  }

  return await db('favourites')
    .where('favourites.users_token', usersToken)
    .andWhere('favourites.bridges_id', id)
    .delete()
}

export async function addFavourite(
  id: number,
  usersToken: string,
): Promise<Favourite> {
  const favCheck = await db('favourites')
    .where('favourites.bridges_id', id)
    .andWhere('favourites.users_token', usersToken)
    .first()

  if (favCheck) {
    throw new Error('Favourite already added')
  }

  return await db('favourites').insert({
    users_token: usersToken,
    bridges_id: id,
  })
}
