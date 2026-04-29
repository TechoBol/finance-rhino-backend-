import { Request, Response } from 'express'
import {
  getAllEnvelopesRepository,
  getAllEnvelopesFromDepositOrderRepository,
  getAllEnvelopesByRegionalRepository
} from '../repository/envelope.repository'

export const getAllEnvelopes = async (_req: Request, res: Response) => {
  try {
    const envelopes = await getAllEnvelopesRepository()
    res.status(200).json(envelopes)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllEnvelopesFromDepositOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const envelopes = await getAllEnvelopesFromDepositOrderRepository(
      Number(id)
    )
    res.status(200).json(envelopes)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllEnvelopesByRegional = async ( req: Request, res: Response ) => {
  try { 
      const { regional } = req.params
      const envelopes = await getAllEnvelopesByRegionalRepository(regional)
      res.status(200).json(envelopes)
  }catch(err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal server error' })
  } 

}