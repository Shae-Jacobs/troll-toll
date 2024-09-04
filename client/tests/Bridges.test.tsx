// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import { within } from '@testing-library/react'
import { renderRoute } from './setup.tsx'

import nock from 'nock'
import { StatusCodes } from 'http-status-codes'

const INITIAL_BRIDGES = [
  {
    id: 1,
    name: 'Auckland Harbour Bridge',
    location: 'Auckland Harbour',
    type: 'Motorway bridge',
    year_built: 1959,
    length_meters: 1020,
    lanes: 8,
    active_by_users: 'auth0|4321',
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 2,
    name: 'Grafton Bridge',
    location: 'Grafton Gully',
    type: 'Road bridge',
    year_built: 1910,
    length_meters: 100,
    lanes: 4,
    active_by_users: 'auth0|4321',
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 3,
    name: 'Jacobs Ladder Bridge',
    location: 'Somewhere',
    type: 'Pedestrian bridge',
    year_built: 2000,
    length_meters: 50,
    lanes: null,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 4,
    name: 'Māngere Bridge',
    location: 'Māngere',
    type: 'Road bridge',
    year_built: 1965,
    length_meters: 300,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 5,
    name: 'Newmarket Viaduct',
    location: 'Newmarket',
    type: 'Viaduct',
    year_built: 1980,
    length_meters: 500,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 6,
    name: 'Onehunga Harbour Road Bridge',
    location: 'Onehunga Harbour Road',
    type: 'Road bridge',
    year_built: 1995,
    length_meters: 150,
    lanes: 2,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 7,
    name: 'Onepoto Bridge',
    location: 'Someplace',
    type: 'Bridge type',
    year_built: 2010,
    length_meters: 80,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 8,
    name: 'Panmure Bridge',
    location: 'Panmure',
    type: 'Bridge type',
    year_built: 2005,
    length_meters: 120,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 9,
    name: 'Tāmaki Bridge',
    location: 'Tāmaki',
    type: 'Bridge type',
    year_built: 2015,
    length_meters: 90,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 10,
    name: 'Upper Harbour Bridge',
    location: 'Upper Harbour',
    type: 'Bridge type',
    year_built: 2008,
    length_meters: 200,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 11,
    name: 'Victoria Park Viaduct',
    location: 'Victoria Park',
    type: 'Viaduct',
    year_built: 1988,
    length_meters: 350,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 12,
    name: 'Westgate Pedestrian and Cycle Bridge',
    location: 'Westgate',
    type: 'Pedestrian and Cycle Bridge',
    year_built: 2018,
    length_meters: 120,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
  {
    id: 13,
    name: 'Wynyard Crossing',
    location: 'Wynyard Quarter',
    type: 'Bascule Bridge',
    year_built: 2012,
    length_meters: 60,
    active_by_users: null,
    image_path: '/images/placeholder-image.webp',
  },
]

beforeAll(() => {
  nock.disableNetConnect()
})

describe('updating a bridge status', () => {
  it('shows the patrol bridge button', async () => {
    nock('http://localhost').get('/api/v1/bridges').reply(200, INITIAL_BRIDGES)
    nock('http://localhost').get('/api/v1/bridges/5').reply(200)
    const screen = renderRoute()
    const button = await screen.findByRole('button')
    expect(button).toBeVisible()
  })

  it('renders status change / update', async () => {
    nock('http://localhost').get('/api/v1/bridges').reply(200, INITIAL_BRIDGES)
    nock('http://localhost').get('/api/v1/bridges/5').reply(StatusCodes.OK)
    const { user, ...screen } = renderRoute()
    const bridgeRender = await screen.findByLabelText(/Newmarket Viaduct/i)
    expect(bridgeRender).toBeVisible()
    const button = await within(bridgeRender).findByLabelText(/status-button/i)

    expect(button).toBeVisible()

    // 1. Patch request to /api/v1/bridges/5
    const scope = nock('http://localhost')
      .patch('/api/v1/bridges/5')
      .reply(StatusCodes.OK)

    // 2. GET request to /api/v1/bridges/5
    const getUpdatedStatusScope = nock('http://localhost')
      .get('/api/v1/bridges/5')
      .reply(200, {
        id: 5,
        name: 'Newmarket Viaduct',
        location: 'Newmarket',
        type: 'Viaduct',
        year_built: 1980,
        length_meters: 500,
        active_by_users: 'auth0|1234',
        image_path: './images/placeholder-image.webp',
      })

    await user.click(button)
    const status = await within(bridgeRender).findByLabelText(/Active/i)
    expect(scope.isDone())
    expect(getUpdatedStatusScope.isDone())
    expect(status).toBeVisible()
  })
})
