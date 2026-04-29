import { Request, Response } from "express";
import {
  getAllExtraExpensesRepository,
  getAllRegionalOfficesRepository,
  registerExtraExpense,
  updateExtraExpensesRepository,
} from "../repository/extrasExpense.repository";
import jwt from "jsonwebtoken";

export const createExtraExpense = async (req: Request, res: Response) => {
  try {
    const token = req.headers["x-access-token"] as string;
    const user = jwt.verify(token, process.env.JWTSECRET!) as any;

    const newExtraExpense = await registerExtraExpense(req.body, user);
    res.status(201).json(newExtraExpense);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllExtraExpenses = async (_req: Request, res: Response) => {
  try {
    const projects = await getAllExtraExpensesRepository();

    return res.status(200).json(projects);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllRegionalOffices = async (_req: Request, res: Response) => {
  try {
    const regionals = await getAllRegionalOfficesRepository();
    return res.status(200).json(regionals);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";

    return res.status(500).json({ message });
  }
};

export const updateExtraExpenses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const token = req.headers["x-access-token"] as string;
    const user = jwt.verify(token, process.env.JWTSECRET!) as any;
    console.log(user)
    const updated = await updateExtraExpensesRepository(Number(id), data, user);

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar" });
  }
};
