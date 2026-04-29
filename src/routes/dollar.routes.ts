import Router from 'express'
import { getAllDollars, getAllDollarsFromDepositOrder, getAllDollarsByRegional } from '../controllers/dollar.controller'

const router = Router()

router.get(`/dollars`, getAllDollars)
router.get(`/dollars/:id`, getAllDollarsFromDepositOrder)
router.get(`/dollars-by-regional/:regional`, getAllDollarsByRegional)

export default router