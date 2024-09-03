import db from './connection.ts'
import { Favourite, FavouriteData } from '../../models/favourite'

export async function getFavourites(): Promise<Favourite[]> { 
  return db('favourites').select('*')
}

