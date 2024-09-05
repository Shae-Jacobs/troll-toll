import express from 'express'
import { Favourite } from '../../models/favourite.ts'
import * as db from '../db/favourite.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = express.Router()
//TODO:CheckJWT
//GET /api/v1/favourites/:user
router.get(
  '/',
  /*checkJwt,*/ async (req: JwtRequest, res) => {
    // const users = req.auth?.sub
    const users = 'auth0|1234'

    // if (!auth0Id || auth0Id === 'undefined') {
    //   console.error('No auth0Id')
    //   return res.status(401).send('Unauthorized')
    // }

    try {
      const favourites = await db.getFavourites(users)
      res.json(favourites)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  },
)

//TODO:CheckJWT
//GET /api/v1/favourites/:user/:id
router.get('/:id', async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  // const users = req.auth?.sub
  const users = 'auth0|1234'

  // if (!auth0Id || auth0Id === 'undefined') {
  //   console.error('No auth0Id')
  //   return res.status(401).send('Unauthorized')
  // }
  try {
    const favourite = await db.getFavouriteById(users, id)
    res.json(favourite)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})
//TODO:CheckJWT
//DELETE /api/v1/favourites/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id) // const users = req.auth?.sub
  // const users = 'auth0|1234'

  // if (!auth0Id || auth0Id === 'undefined') {
  //   console.error('No auth0Id')
  //   return res.status(401).send('Unauthorized')
  // }
  try {
    await db.deleteFavouriteById(id, users)
    res.sendStatus(202)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

//TODO:CheckJWT
//POST /api/v1/favourites
router.post('/', async (req, res) => {
  // const user = String(req.params.user)
  const newFave = req.body as Favourite
  try {
    await db.addFavourite(newFave)
    res.sendStatus(202)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
