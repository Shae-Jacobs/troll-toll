import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './connection.ts'
import * as db from './bridge.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('db.getBridges()', () => {
  it('gets all the bridges', async () => {
    // ARRANGE
    // ACT
    const bridges = await db.getBridges()
    // ASSERT
    expect(bridges).toHaveLength(13)
  })
})

describe('db.setActiveBridgesById()', () => {
  it('set an active bridge by id and user token', async () => {
    const bridges = await db.setActiveBridgesById(
      5,
      'auth0|66cd6988c74335a09e9bb8e7',
    )
    const bridges2 = await db.getBridgesById(5)

    expect(bridges).toStrictEqual(1)

    expect(bridges2).toStrictEqual({
      id: 5,
      name: 'Newmarket Viaduct',
      location: 'Newmarket',
      type: 'Viaduct',
      yearBuilt: 1980,
      lanes: null,
      lengthMeters: 500,
      activeByUsers: 'auth0|66cd6988c74335a09e9bb8e7',
      imagePath: 'newmarket-viaduct.jpg',
    })
  })
})
