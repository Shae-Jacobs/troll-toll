import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'

import connection from '../db/connection.ts'
import server from '../server.ts'
import request from 'supertest'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('getting all the bridges with expected data', () => {
  it('responds with all the data', async () => {
    const res = await request(server).get('/api/v1/bridges')

    expect(res.body).toHaveLength(13)
    expect(res.body[0]).toStrictEqual({
      id: 1,
      name: 'Auckland Harbour Bridge',
      location: 'Auckland Harbour',
      type: 'Motorway bridge',
      yearBuilt: 1959,
      lengthMeters: 1020,
      lanes: 8,
      activeByUsers: 'auth0|4321',
      imagePath: String(process.env.IMAGE_PATH),
    })

    expect(res.body[11]).toStrictEqual({
      id: 12,
      name: 'Westgate Pedestrian and Cycle Bridge',
      location: 'Westgate',
      type: 'Pedestrian and Cycle Bridge',
      yearBuilt: 2018,
      lengthMeters: 120,
      lanes: null,
      activeByUsers: null,
      imagePath: String(process.env.IMAGE_PATH),
    })
  })
})

describe('searches all the bridges by id', () => {
  it('finds the correct bridge by id', async () => {
    const res = await request(server).get('/api/v1/bridges/2')

    expect(res.statusCode).toBe(StatusCodes.OK)
    expect(res.body).toStrictEqual({
      id: 2,
      name: 'Grafton Bridge',
      location: 'Grafton Gully',
      type: 'Road bridge',
      yearBuilt: 1910,
      lengthMeters: 100,
      lanes: 4,
      activeByUsers: 'auth0|4321',
      imagePath: String(process.env.IMAGE_PATH),
    })
  })

  it('fails to find a bridge when sent a bad request', async () => {
    const res1 = await request(server).get('/api/v1/bridges/-1')
    const res2 = await request(server).get('/api/v1/bridges/20')
    const res3 = await request(server).get('/api/v1/bridges/letmein!')

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST)
    expect(res2.status).toBe(StatusCodes.OK)
    expect(res3.status).toBe(StatusCodes.BAD_REQUEST)
  })
})

describe('setting a trolls activity status', () => {
  it('allow the troll to set its status', async () => {
    const res = await request(server)
      .patch('/api/v1/bridges/5')
      .set('Authorization', `Bearer auth0|1234`)

    expect(res.status).toBe(StatusCodes.OK)

    const res2 = await request(server).get('/api/v1/bridges/5')
    expect(res2.status).toBe(StatusCodes.OK)
    expect(res2.body).toStrictEqual({
      id: 5,
      name: 'Newmarket Viaduct',
      location: 'Newmarket',
      type: 'Viaduct',
      yearBuilt: 1980,
      lanes: null,
      lengthMeters: 500,
      activeByUsers: 'auth0|1234',
      imagePath: String(process.env.IMAGE_PATH),
    })
  })
})
