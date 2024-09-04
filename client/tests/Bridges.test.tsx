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
    image_path: String(process.env.IMAGE_PATH),
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
    image_path: String(process.env.IMAGE_PATH),
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
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 4,
    name: 'Māngere Bridge',
    location: 'Māngere',
    type: 'Road bridge',
    year_built: 1965,
    length_meters: 300,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 5,
    name: 'Newmarket Viaduct',
    location: 'Newmarket',
    type: 'Viaduct',
    year_built: 1980,
    length_meters: 500,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
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
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 7,
    name: 'Onepoto Bridge',
    location: 'Someplace',
    type: 'Bridge type',
    year_built: 2010,
    length_meters: 80,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 8,
    name: 'Panmure Bridge',
    location: 'Panmure',
    type: 'Bridge type',
    year_built: 2005,
    length_meters: 120,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 9,
    name: 'Tāmaki Bridge',
    location: 'Tāmaki',
    type: 'Bridge type',
    year_built: 2015,
    length_meters: 90,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 10,
    name: 'Upper Harbour Bridge',
    location: 'Upper Harbour',
    type: 'Bridge type',
    year_built: 2008,
    length_meters: 200,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 11,
    name: 'Victoria Park Viaduct',
    location: 'Victoria Park',
    type: 'Viaduct',
    year_built: 1988,
    length_meters: 350,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 12,
    name: 'Westgate Pedestrian and Cycle Bridge',
    location: 'Westgate',
    type: 'Pedestrian and Cycle Bridge',
    year_built: 2018,
    length_meters: 120,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
  },
  {
    id: 13,
    name: 'Wynyard Crossing',
    location: 'Wynyard Quarter',
    type: 'Bascule Bridge',
    year_built: 2012,
    length_meters: 60,
    active_by_users: null,
    image_path: String(process.env.IMAGE_PATH),
  },
]

beforeAll(() => {
  nock.disableNetConnect()
})

describe('Adding a new movie', () => {
  it('shows the add movie form', async () => {
    nock('http://localhost').get('/api/v1/bridges').reply(200, INITIAL_BRIDGES)
    const screen = renderRoute('/bridges')
    const button = await screen.findByLabelText(/status-button/i)
    expect(button).toBeVisible()
  })

  it('takes us to the new movie page', async () => {
    nock('http://localhost').get('/api/v1/movies').reply(200, INITIAL_BRIDGES)
    const { user, ...screen } = renderRoute('/movies')
    const form = await screen.findByRole('form', { name: 'Create movie' })
    expect(form).toBeVisible()

    // 1. POST request to /api/v1/movies
    const scope = nock('http://localhost')
      .post('/api/v1/movies', {
        title: 'Dune part 2',
        release_year: 2024,
      })
      .reply(
        StatusCodes.CREATED,
        {
          id: 4,
          title: 'Dune part 2',
          release_year: 2024,
        },
        {
          Location: '/api/v1/movies/4',
        },
      )

    // 2. GET request to /api/v1/ movies
    const getNewMovieScope = nock('http://localhost')
      .get('/api/v1/movies/4?withCategories=true')
      .reply(200, {
        id: 4,
        title: 'Dune part 2',
        release_year: 2024,
        categories: [],
      })

    const titleInput = await within(form).findByLabelText('Title')
    await user.clear(titleInput)
    await user.type(titleInput, 'Dune part 2')

    const yearInput = await within(form).findByLabelText('Release Year')
    await user.clear(yearInput)
    await user.type(yearInput, '2024')

    const submit = await within(form).findByRole('button')
    await user.click(submit)

    // 3. we will navigate to the individual movie page for that movie
    const heading = await screen.findByRole('heading', {
      name: 'Dune part 2 (2024)',
    })

    expect(scope.isDone()).toBe(true)
    expect(getNewMovieScope.isDone()).toBe(true)
    expect(heading).toBeVisible()
  })
})
