import { Request, Response } from 'express'
import {
  getAllDespositOrderBranchOfficeGivenAnDepositOrderId as getAllDespositOrderBranchOfficeGivenAnDepositOrderIdRepository,
  getAllDespositOrderBranchOffice
} from '../repository/depositOrderBranchOffice.repository'

export const getAllDespositOrderBranchOfficeGivenAnDepositOrderId = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const depositOrderBranchOffices =
      await getAllDespositOrderBranchOfficeGivenAnDepositOrderIdRepository(
        Number(id)
      )
    return res.status(200).json(depositOrderBranchOffices)
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message })
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllDepositOrderBranchOffices = async (
  _req: Request,
  res: Response
) => {
  try {
    const depositOrderBranchOffices =
      await getAllDespositOrderBranchOffice()
    return res.status(200).json(depositOrderBranchOffices)
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message })
    return res.status(500).json({ message: 'Internal server error' })
  }
}
