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
      year_built: 1959,
      length_meters: 1020,
      lanes: 8,
      active_by_users: '0auth|4321',
      image_path: process.env.IMAGE_PATH,
    })

    expect(res.body[11]).toStrictEqual({
      id: 12,
      name: 'Westgate Pedestrian and Cycle Bridge',
      location: 'Westgate',
      type: 'Pedestrian and Cycle Bridge',
      year_built: 2018,
      length_meters: 120,
      active_by_users: null,
      image_path: process.env.IMAGE_PATH,
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
      year_built: 1910,
      length_meters: 100,
      lanes: 4,
      active_by_users: '0auth|4321',
      image_path: process.env.IMAGE_PATH,
    })
  })

  it('fails to find a bridge when sent a bad request', async () => {
    const res1 = await request(server).get('/api/v1/bridges/-1')
    const res2 = await request(server).get('/api/v1/bridges/20')
    const res3 = await request(server).get('/api/v1/bridges/letmein!')

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST)
    expect(res2.status).toBe(StatusCodes.NOT_FOUND)
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
      year_built: 1980,
      length_meters: 500,
      active_by_users: 'auth0|1234',
      image_path: process.env.IMAGE_PATH,
    })
  })
})
