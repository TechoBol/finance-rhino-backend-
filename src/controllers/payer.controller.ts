
import { Request, Response } from "express";
import { changeVisibilityOfPayerRepository, createPayerRepository, getAllPayersRepository } from "../repository/payer.repository";

export const createPayerController = async (req: Request, res: Response) => {
  try {
    const { name, numeral } = req.body;
    if (!name || numeral === undefined) {
      return res.status(400).json({
        message: "name y numeral son obligatorios",
      });
    }

    const payer = await createPayerRepository({
      name,
      numeral: Number(numeral),
    });

    return res.status(201).json(payer);
  } catch (error: any) {
    console.error("Error al crear payer:", error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getAllPayers = async (_req: Request, res: Response) => {
  try {
    const subAccounts = await getAllPayersRepository()
    res.status(200).json(subAccounts)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const changeVisibilityPayer = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const deletedSubAccount = await changeVisibilityOfPayerRepository(
      Number(id)
    )
    res.status(200).json(deletedSubAccount)
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

