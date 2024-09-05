import request from 'superagent'
import { Favourite } from '../../models/favourite'

//GET 'api/v1/favourites'
export async function getFavourites(usersToken: string): Promise<Favourite[]> {
  if (usersToken !== 'wait') {
    const result = await request
      .get(`/api/v1/favourites/`)
      .set('Authorization', `Bearer ${usersToken}`)

    return result.body as Favourite[]
  }
  return []
}
