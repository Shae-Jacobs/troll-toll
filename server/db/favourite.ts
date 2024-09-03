import db from './connection.ts'
import { Favourite, FavouriteData } from '../../models/favourite'

export async function getFavourites(): Promise<Favourite[]> {
  return db('favourites').select('*')
}

export async function getFavouriteById(id: number): Promise<Favourite> {
  return db('favourites').where({ id }).select('*').first()
}

export async function deleteFavouriteById(id: number) {
  return db('favourites').where({ id }).delete().first()
}

export async function addFavourite(favourite: Favourite) {}
