import { Request, Response } from 'express'
import {
  getAllAccountsRepository,
  registerAccountRepository,
  changeVisibilityAccountRepository
} from '../repository/account.repository'
import { changeVisibilityGivenAnAccountId } from '../repository/subAccount.repository'

export const getAllAccounts = async (_req: Request, res: Response) => {
  try {
    const accounts = await getAllAccountsRepository()
   return  res.status(200).json(accounts)
  } catch (error) {
    if (error instanceof Error) return res.status(500).json({ message: error.message })

   return  res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createAccount = async (req: Request, res: Response) => {
  try {
    const newAccount = await registerAccountRepository(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateVisibilityAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedAccount = await changeVisibilityAccountRepository(Number(id))
    await changeVisibilityGivenAnAccountId(Number(id))
    res.status(200).json(deletedAccount)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
