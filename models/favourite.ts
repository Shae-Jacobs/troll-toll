export interface Favourite {
  bridgeId: number
  userToken: string
}

export interface FavouriteData extends Favourite {
  id?: number
}
