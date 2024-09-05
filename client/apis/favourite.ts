import request from 'superagent'
import { Favourite, FavouriteData } from '../../models/favourite'

//GET 'api/v1/favourites'
export async function getFavourites(usersToken: string): Promise<Favourite[]> {
  if (usersToken !== 'wait') {
    const result = await request
      .get(`/api/v1/favourites`)
      .set('Authorization', `Bearer ${usersToken}`)

    return result.body as Favourite[]
  }
  return []
}

//GET 'api/v1/favourite/:user/:id'
export async function getFavouriteById(user: string, id: number) {
  const result = await request.get(`/api/v1/favourites/${user}/${id}`)
  return result.body as FavouriteData
}

//DELETE 'api/v1/favourite/:user/:id'
export async function deleteFavouriteById(user: string, id: number) {
  const result = await request.delete(`/api/v1/favourites/${user}/${id}`)
  console.log(result.statusCode)
  return
}

interface AddFunction {
  id: number
  usersToken: string
}

//POST 'api/v1/favourite
export async function addFavourite({id, usersToken}: AddFunction ) {
  const result = await request.post(`/api/v1/favourites/${id}`).set('Authorization', `Bearer ${usersToken}`)
  console.log(result.statusCode)
  return
}
