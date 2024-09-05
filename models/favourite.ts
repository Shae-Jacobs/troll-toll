export interface Favourite {
  bridgesId: number
  usersToken: string
}

export interface FavouriteData extends Favourite {
  id?: number
}
