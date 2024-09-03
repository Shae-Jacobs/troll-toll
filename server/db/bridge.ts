import db from './connection.ts'
import { Bridge } from '../../models/bridge.ts'

export async function getBridges(): Promise<Bridge[]> {
  return db('bridges').select('*')
}

export async function setActiveBridgesById(
  id: number,
  auth0Id: string,
): Promise<void> {
  const allUsers = await getActiveUsers()
  const isActive = allUsers.find((user) => user.activeByUsers === auth0Id)
  const isBridgeActive = await getBridgesById(id)
  if (isBridgeActive.activeByUsers === null && auth0Id) {
    if (isActive) {
      await db('bridges')
        .where('bridges.id', isActive.id)
        .update('bridges.active_by_users', null)
    }
    return await db('bridges')
      .where('bridges.id', id)
      .update('bridges.active_by_users', auth0Id)
  } else {
    throw new Error('Unauthorized!')
  }
}

export async function getActiveUsers(): Promise<Bridge[]> {
  const allBridges = await db('bridges').select(
    'bridges.id',
    'bridges.active_by_users, as activeByUsers',
  )

  return allBridges.filter(
    (bridge: Bridge) => bridge.activeByUsers !== null || '',
  )
}

export async function getBridgesById(id: number): Promise<Bridge> {
  return await db('bridges')
    .where({ id })
    .first(
      'bridges.id',
      'bridges.name',
      'bridges.location',
      'bridges.type',
      'bridges.year_built as yearBuilt',
      'bridges.length_meters as lengthMeters',
      'bridges.lanes',
      'bridges.active_by_Users as activeByUsers',
    )
}
