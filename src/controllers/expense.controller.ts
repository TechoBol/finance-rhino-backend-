import { Request, Response } from 'express'
import {
  getAllExpensesRepository,
  getAllExpensesFromDepositOrderRepository,
  getAllExpensesByRegionalRepository
} from '../repository/expense.repository'

export const getAllExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await getAllExpensesRepository()
    res.status(200).json(expenses)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllExpensesFromDepositOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const expenses = await getAllExpensesFromDepositOrderRepository(Number(id))
    res.status(200).json(expenses)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllExpensesByRegional = async (req: Request, res: Response) => {
  try { 
    const { regional } = req.params
    const response = await getAllExpensesByRegionalRepository(regional)
    res.status(200).json(response)
  }catch(err) { 
    if (err instanceof Error) {
      res.status(500).json({ message: err.message })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}
