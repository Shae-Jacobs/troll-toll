import request from 'superagent'
import { Favourite, FavouriteData } from '../../models/favourite'

//GET 'api/v1/favourite'
export async function getFavourites() {
  const result = await request.get(`/api/v1/favourite`)
  return result.body as FavouriteData[]
}

//GET 'api/v1/favourite/:user/:id'
export async function getFavouriteById(user: string, id: number) {
  const result = await request.get(`/api/v1/favourite/${user}/${id}`)
  return result.body as FavouriteData
}

//DELETE 'api/v1/favourite/:user/:id'
export async function deleteFavouriteById(user: string, id: number) {
  return await request.delete(`/api/v1/favourite/${user}/${id}`)
}
