import express from 'express'

import * as db from '../db/toll.ts'
import checkJwt from '../auth0.ts'

const router = express.Router()

// GET /api/v1/tolls/:user/:id
router.get('/:user/:id', checkJwt, async (req, res) => {
  const user = String(req.params.user)
  const id = Number(req.params.id)
  try {
    const tolls = await db.getUsersTollsByBridgeId(user, id)
    res.json(tolls)
  } catch (error) {
    console.error(error)
    res.status(500).send('failed to get tolls by user and bridge')
  }
})

// POST /api/v1/tolls
router.post('/', checkJwt, async (req, res) => {
  const newToll = req.body
  try {
    await db.addToll(newToll)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).send('failed add new toll')
  }
})

export default router
