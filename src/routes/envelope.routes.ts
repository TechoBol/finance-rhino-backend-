import Router from 'express'
import {
  getAllEnvelopes,
  getAllEnvelopesFromDepositOrder,
  getAllEnvelopesByRegional
} from '../controllers/envelope.controller'

const router = Router()

router.get('/envelopes', getAllEnvelopes)
router.get('/envelopes/:id', getAllEnvelopesFromDepositOrder)
router.get('/envelopes-by-regional/:regional', getAllEnvelopesByRegional)

export default router
