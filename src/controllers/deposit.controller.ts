import { Request, Response } from 'express'
import {
  getAllDepositsReposiory,
  getAllDepositsFromDepositOrderRepository,
  getAllDepositsByRegionalRepository
} from '../repository/deposit.repository'

export const getAllDeposits = async (_req: Request, res: Response) => {
  try {
    const deposits = await getAllDepositsReposiory()
    res.status(200).json(deposits)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllDepositsFromDepositOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const depsits = await getAllDepositsFromDepositOrderRepository(Number(id))
    res.status(200).json(depsits)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllDepositsByRegional = async ( req: Request, res: Response ) => {
  try { 
    const { regional } = req.params
    const deposits = await getAllDepositsByRegionalRepository(regional)
    res.status(200).json(deposits)
  }catch(err) { 
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  }
} 