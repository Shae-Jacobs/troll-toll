import express from 'express'

import * as db from '../db/toll.ts'

const router = express.Router()

// GET /api/v1/tolls/:id/:user
router.get('/:user/:id', async (req, res) => {
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
