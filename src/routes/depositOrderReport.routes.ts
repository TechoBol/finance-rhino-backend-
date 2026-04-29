import Router from 'express'
import { createDepositOrderReport, updateDepositOrderReport } from '../controllers/depositOrderReport.controller'

const router = Router()

router.post('/create-deposit-order-report', createDepositOrderReport)
router.put('/update-deposit-order-report/:id', updateDepositOrderReport)
export default router