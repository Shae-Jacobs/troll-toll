import db from './connection.ts'
import { Bridge } from '../../models/bridge.ts'

export async function getBridges(): Promise<Bridge[]> {
  return db('bridges').select(
    'bridges.id',
    'bridges.name',
    'bridges.location',
    'bridges.type',
    'bridges.year_built as yearBuilt',
    'bridges.length_meters as lengthMeters',
    'bridges.active_by_users as activeByUsers',
    'bridges.image_path as imagePath',
  )
}

export function getBridgeById(id: number) {
  return db('bridges')
    .where({ id })
    .first(
      'bridges.id',
      'bridges.name',
      'bridges.location',
      'bridges.type',
      'bridges.year_built as yearBuilt',
      'bridges.length_meters as lengthMeters',
      'bridges.active_by_users as activeByUsers',
      'bridges.image_path as imagePath',
    )
}
