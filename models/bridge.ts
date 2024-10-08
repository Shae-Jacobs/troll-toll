export interface Bridge {
  id: number
  name: string
  location: string
  type: string
  yearBuilt: number
  lengthMeters: string
  lanes: number | null
  activeByUsers?: string | null
  imagePath: string
  longitude: number
  latitude: number
}
