import express from 'express'
import { Bridge } from '../../models/bridge.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/bridge.ts'

const router = express.Router()

// GET /api/v1/bridges
router.get('/', async (req, res) => {
  try {
    const bridges = await db.getBridges()

    res.json(bridges as Bridge[])
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/bridges/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!id || id < 1) {
    console.error('No Bridge Found')
    return res.status(400).send('Bad request')
  }
  try {
    const bridges = await db.getBridgesById(id)

    res.json(bridges as Bridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// PATCH /api/v1/bridges/:id
router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const id = Number(req.params.id)

  if (!id || id < 1) {
    console.error('No Bridge Found')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.setActiveBridgesById(id, auth0Id)
    res.status(200).json({ message: `Bridge: ${id}, is now active!` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
