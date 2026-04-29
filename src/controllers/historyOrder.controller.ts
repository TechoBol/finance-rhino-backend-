import { Request, Response } from 'express'

import { getDepositOrderHistoryByOrderNumber } from "../repository/history"

export const getDepositOrderHistory = async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params
    const history = await getDepositOrderHistoryByOrderNumber(orderNumber)
    return res.status(200).json(history)
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message })
    return res.status(500).json({ message: 'Internal server error' })
  }
}