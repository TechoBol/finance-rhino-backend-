import { Request, Response } from 'express'
import {
  getAllSubAccountsRepository,
  registerSubAccountRepository,
  changeVisibilityOfSubAccountRepository
} from '../repository/subAccount.repository'

export const getAllSubAccounts = async (_req: Request, res: Response) => {
  try {
    const subAccounts = await getAllSubAccountsRepository()
    res.status(200).json(subAccounts)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createSubAccount = async (req: Request, res: Response) => {
  try {
    const newSubAccount = await registerSubAccountRepository(req.body)
    res.status(200).json(newSubAccount)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const changeVisibilitySubAccount = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const deletedSubAccount = await changeVisibilityOfSubAccountRepository(
      Number(id)
    )
    res.status(200).json(deletedSubAccount)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

