import { Request, Response } from 'express'
import {
  getAllBranchOfficesRepository,
  registerBranchOfficeRepository,
  changeVisibilityOfBranchOfficeRepository
} from '../repository/branchOffice.repository'

export const getAllBranchOffices = async (_req: Request, res: Response) => {
  try {
    const response = await getAllBranchOfficesRepository()

    return res.status(200).json(response)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const createBranchOffice = async (req: Request, res: Response) => {
  try {
    const response = await registerBranchOfficeRepository(req.body)

    return res.status(201).json(response)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateVisibilityBranchOffice = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const response = await changeVisibilityOfBranchOfficeRepository(Number(id))

    return res.status(200).json(response)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}
