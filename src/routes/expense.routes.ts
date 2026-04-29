import Router from 'express'
import { getAllExpenses, getAllExpensesFromDepositOrder, getAllExpensesByRegional } from '../controllers/expense.controller'

const router = Router()

router.get('/expenses', getAllExpenses)
router.get('/expenses/:id', getAllExpensesFromDepositOrder)
router.get('/expenses-by-regional/:regional', getAllExpensesByRegional)

export default router
