import request from 'superagent'
import { Favourite, FavouriteData } from '../../models/favourite'

//GET 'api/v1/favourites'
export async function getFavourites() {
  const result = await request.get(`/api/v1/favourites`)
  return result.body as FavouriteData[]
}

//GET 'api/v1/favourites/:user/:id
export async function getFavouriteById(user: string, id: number) {
  const result = await request.get(`/api/v1/favourites/${user}/${id}`)
  return result.body as FavouriteData
}

