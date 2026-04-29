import { Request, Response } from 'express'
import {
  getAllBanksRepository,
  registerBankRepository,
  changeVisibilityOfBankRepository
} from '../repository/banks.repository'

export const getAllBanks = async (_req: Request, res: Response) => {
  try {
    const subAccounts = await getAllBanksRepository()
    res.status(200).json(subAccounts)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createBank = async (req: Request, res: Response) => {
  try {
    const newSubAccount = await registerBankRepository(req.body)
    res.status(200).json(newSubAccount)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const changeVisibilityBank = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const deletedSubAccount = await changeVisibilityOfBankRepository(
      Number(id)
    )
    res.status(200).json(deletedSubAccount)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

