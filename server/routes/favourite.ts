import express from 'express'

import * as db from '../db/favourite.ts'

const router = express.Router()

//GET /api/v1/favourites/:user
router.get('/:user/', async (req, res) => {
  const usersToken = String(req.params.user)
  try {
    const favourites = await db.getFavourites(usersToken)
    res.json(favourites)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

//GET /api/v1/favourites/:user/:id
router.get('/:user/:id', async (req, res) => {
  const usersToken = String(req.params.user)
  const favouriteId = Number(req.params.id)
  try {
    const favourite = await db.getFavouriteById(usersToken, favouriteId)
    res.json(favourite)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

//DELETE /api/v1/favourites/:id
router.delete('/:user/:id', async (req, res) => {
  const usersToken = String(req.params.user)
  const favouriteId = Number(req.params.id)
  try {
    await db.getFavouriteById(usersToken, favouriteId)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
