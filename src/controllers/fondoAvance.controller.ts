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
    const { name, amount, month, year } = req.body;
    const now = new Date();
    const nuevo = await createFondoAvanceRepository({
      name,
      amount: Number(amount),
      month: month !== undefined ? Number(month) : now.getMonth(), // fallback mes actual
      year: year !== undefined ? Number(year) : now.getFullYear(), // fallback año actual
    });
    res.json(nuevo);
  } catch {
    res.status(500).json({ error: "Error creando fondo" });
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
