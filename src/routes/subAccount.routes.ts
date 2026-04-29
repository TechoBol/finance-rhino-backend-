import Router from 'express'
import { getAllSubAccounts, createSubAccount, changeVisibilitySubAccount } from '../controllers/subAccount.controlller'

const router = Router()

router.get('/sub-accounts', getAllSubAccounts)
router.post('/create-sub-account', createSubAccount)
router.put('/delete-sub-account/:id', changeVisibilitySubAccount)

export default router