import { Response, Request } from 'express'
import { getAllRegionals } from '../repository/regionalOffice.repository'

export const getRegionals = async (_req: Request, res: Response) => {
  try {
    const regionals = await getAllRegionals()
    res.status(200).json(regionals)
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
