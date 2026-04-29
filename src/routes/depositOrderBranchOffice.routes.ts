import Router from 'express'
import { getAllDespositOrderBranchOfficeGivenAnDepositOrderId, getAllDepositOrderBranchOffices } from '../controllers/depositOrderBranchOffice.controller'

const router = Router()

router.get(
  '/deposit-order-branch-offices/:id',
  getAllDespositOrderBranchOfficeGivenAnDepositOrderId
)

router.get('/deposit-order-branch-offices', getAllDepositOrderBranchOffices)

export default router
