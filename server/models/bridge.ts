export interface bridges {
  id:;
  name: string;
  location: string;
  type: string;
  year_built: number;
  length_meters: number;
  lanes: number;
  active_by_users: string;
  image_path: string;
}

export interface favourites {
  id: number;
  name: string;
  location: string;
  type: string;
}