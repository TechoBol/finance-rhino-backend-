import { Router } from 'express'
import {
  createAccount,
  getAllAccounts,
  updateVisibilityAccount
} from '../controllers/account.controller'

const router = Router()

router.get('/accounts', getAllAccounts)
router.post('/create-account', createAccount)
router.put('/delete-account/:id', updateVisibilityAccount)

export default router
