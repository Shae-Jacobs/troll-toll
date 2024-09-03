import express from 'express'

import * as db from '../db/favourite.ts'

const router = express.Router()

//GET /api/v1/favourites/:user
router.get('/:user/', async (req, res) => {
  const user = String(req.params.user)
  try {
    const favourites = await db.getFavourites(user)
    res.json(favourites)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
