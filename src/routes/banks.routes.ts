import Router from 'express'
import { changeVisibilityBank, createBank, getAllBanks } from '../controllers/banks.controller'

const router = Router()

router.get('/banks', getAllBanks)
router.post('/create-bank', createBank)
router.put('/delete-bank/:id', changeVisibilityBank)

export default router