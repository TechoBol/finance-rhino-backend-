import { Request, Response } from "express";
import {
  getAllFondosAvanceRepository,
  createFondoAvanceRepository,
  deleteFondoAvanceRepository,
} from "../repository/fondoAvance.repository";

export const getAllFondosAvance = async (_req: Request, res: Response) => {
  try {
    const data = await getAllFondosAvanceRepository();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error obteniendo fondos" });
  }
};

export const createFondoAvance = async (req: Request, res: Response) => {
  try {
    const { name, amount, currency } = req.body;
    console.log(amount)
    const nuevo = await createFondoAvanceRepository({
      name,
      amount: Number(amount),
      currency,
    });

    res.json(nuevo);
  } catch {
    res.status(500).json({
      error: "Error creando fondo",
    });
  }
};

export const deleteFondoAvance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteFondoAvanceRepository(Number(id));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Error eliminando fondo" });
  }
};
