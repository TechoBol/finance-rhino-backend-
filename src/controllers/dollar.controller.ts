import { Request, Response } from 'express'
import {
  getAllDollarsRepository,
  getAllDollarsFromDepositOrderRepository,
  getAllDollarsByRegionalRepository
} from '../repository/dollar.repository'

export const getAllDollars = async (_req: Request, res: Response) => {
  try {
    const response = await getAllDollarsRepository()
    res.status(200).json(response)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllDollarsFromDepositOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const response = await getAllDollarsFromDepositOrderRepository(Number(id))
    res.status(200).json(response)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllDollarsByRegional = async ( req: Request, res: Response ) => {
  try { 
    const { regional } = req.params
    const dollars = await getAllDollarsByRegionalRepository(regional)
    res.status(200).json(dollars)
  }catch(err) { 
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  }
} 