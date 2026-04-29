import { Request, Response } from "express";
import { createCashFlowRepository, getAllCashFlowRepository, updateCashFlowRepository } from "../repository/cashFlow.repository";


export const getAllCashFlow = async (_req: Request, res: Response) => {
  try {
    const data = await getAllCashFlowRepository();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error obteniendo datos" });
  }
};

export const createCashFlow = async (req: Request, res: Response) => {
  try {
    const newItem = await createCashFlowRepository(req.body);
    res.json(newItem);
  } catch {
    res.status(500).json({ error: "Error creando registro" });
  }
};

export const updateCashFlow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await updateCashFlowRepository(Number(id), req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Error actualizando" });
  }
};