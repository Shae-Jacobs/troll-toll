import express from 'express'
import { Favourite } from '../../models/favourite.ts'
import * as db from '../db/favourite.ts'

const router = express.Router()
//TODO:CheckJWT
//GET /api/v1/favourites/:user
router.get('/:user', async (req, res) => {
  const users = req.params.user
  try {
    const favourites = await db.getFavourites(users)
    res.json(favourites)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})
//TODO:CheckJWT
//GET /api/v1/favourites/:user/:id
router.get('/:user/:id', async (req, res) => {
  const user = req.params.user
  const id = Number(req.params.id)
  try {
    const favourite = await db.getFavouriteById(user, id)
    res.json(favourite)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})
//TODO:CheckJWT
//DELETE /api/v1/favourites/:id
router.delete('/:user/:id', async (req, res) => {
  const user = String(req.params.user)
  const id = Number(req.params.id)
  try {
    await db.getFavouriteById(user, id)
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
