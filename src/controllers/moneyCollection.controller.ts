import { Request, Response } from 'express'
import {
  getAllMoneyCollectionFromDepositOrderRepository,
  getAllMoneyCollectionsByRegionalRepository,
  getAllMoneyCollectionsRepository
} from '../repository/moneyCollection.repository'

export const getAllMoneyCollections = async (_req: Request, res: Response) => {
  try {
    const response = await getAllMoneyCollectionsRepository()
    return res.status(200).json(response)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllMoneyCollectionFromDepositOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const moneyCollections =
      await getAllMoneyCollectionFromDepositOrderRepository(Number(id))
     res.status(200).json(moneyCollections)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllMoneyCollectionsByRegional = async (req: Request, res: Response) => { 
    const { regional } = req.params
    try { 
        const response = await getAllMoneyCollectionsByRegionalRepository(regional)
        res.status(200).json(response)
    }
    catch(err)
    {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
          }
          res.status(500).json({ message: 'Internal server error' })
    }
}