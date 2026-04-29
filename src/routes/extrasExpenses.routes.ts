import { Router } from 'express'
import {
  createExtraExpense,
  getAllExtraExpenses,
  getAllRegionalOffices, 
  updateExtraExpenses
} from '../controllers/extrasExpenses.controller'

const router = Router()

router.post('/create-extra-expense', createExtraExpense)
router.get("/get-extra-expenses", getAllExtraExpenses);
router.get("/regional-offices", getAllRegionalOffices);
router.put("/update-extra-expenses/:id", updateExtraExpenses );

export default router
