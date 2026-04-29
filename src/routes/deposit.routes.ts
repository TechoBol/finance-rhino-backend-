import Router from 'express'
import {
  getAllDeposits,
  getAllDepositsFromDepositOrder,
  getAllDepositsByRegional
} from '../controllers/deposit.controller'

const router = Router()

router.get('/deposits', getAllDeposits)
router.get('/deposits/:id', getAllDepositsFromDepositOrder)
router.get('/deposits-by-regional/:regional', getAllDepositsByRegional)

export default router
