import request from 'superagent'
import { Favourite, FavouriteData } from '../../models/favourite'

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

//GET 'api/v1/favourites'
export async function getFavourites(usersToken: string): Promise<Favourite[]> {
  if (usersToken === 'wait') {
    await sleep(500)
    return []
  }
  const result = await request
    .get(`/api/v1/favourites`)
    .set('Authorization', `Bearer ${usersToken}`)
  return result.body as Favourite[]
}

//GET 'api/v1/favourite/:user/:id'
export async function getFavouriteById(user: string, id: number) {
  const result = await request.get(`/api/v1/favourites/${user}/${id}`)
  return result.body as FavouriteData
}

interface MutateFunction {
  id: number
  usersToken: string
}

//DELETE 'api/v1/favourite/:user/:id'
export async function deleteFavouritesById({
  usersToken,
  id,
}: MutateFunction): Promise<void> {
  await request
    .delete(`/api/v1/favourites/${id}`)
    .set('Authorization', `Bearer ${usersToken}`)
}

//POST 'api/v1/favourite
export async function addFavourite({
  id,
  usersToken,
}: MutateFunction): Promise<void> {
  await request
    .post(`/api/v1/favourites/${id}`)
    .set('Authorization', `Bearer ${usersToken}`)
}
