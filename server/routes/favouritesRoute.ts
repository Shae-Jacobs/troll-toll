import express from 'express'
import * as db from '../db/favourite.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = express.Router()
//TODO:CheckJWT
//GET /api/v1/favourites/:user
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const users = req.auth?.sub

  if (!users || users === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    const favourites = await db.getFavourites(users)
    res.json(favourites)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

//TODO:CheckJWT
//DELETE /api/v1/favourites/:id
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const users = req.auth?.sub
  const id = Number(req.params.id)

  if (!id || id < 1) {
    console.error('No Bridge Found')
    return res.status(400).send('Bad request')
  }

  if (!users || users === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
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
router.post('/:id', checkJwt, async (req: JwtRequest, res) => {
  const users = req.auth?.sub
  const id = Number(req.params.id)

  if (!id || id < 1) {
    console.error('No Bridge Found')
    return res.status(400).send('Bad request')
  }

  if (!users || users === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.addFavourite(id, users)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
