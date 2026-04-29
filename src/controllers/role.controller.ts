import { Request, Response } from 'express'
import { getAllRolesRepository } from '../repository/role.repository'

export const getAllRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await getAllRolesRepository()
    return res.status(200).json(roles)
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message })
    return res.status(500).json({ message: 'Internal server error' })
  }
}
