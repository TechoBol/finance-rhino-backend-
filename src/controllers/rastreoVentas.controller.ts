import { Request, Response } from "express";
import {
  getRastreoVentasRepository,
  upsertRastreoVentasRepository,
} from "../repository/rastreoVentas.repository";

// controller/rastreoVentas.controller.ts
export const getRastreoVentas = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const month =
      req.query.month !== undefined ? Number(req.query.month) : now.getMonth();
    const year =
      req.query.year !== undefined ? Number(req.query.year) : now.getFullYear();

    console.log("Query params:", req.query);
    console.log("Buscando month:", month, "year:", year);

    const data = await getRastreoVentasRepository(month, year);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo rastreo de ventas" });
  }
};

// controller/rastreoVentas.controller.ts
export const upsertRastreoVentas = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const { month, year, ...rest } = req.body;

    console.log("Body recibido:", req.body); // ← para verificar

    const resolvedMonth =
      month !== undefined && month !== null ? Number(month) : now.getMonth();
    const resolvedYear =
      year !== undefined && year !== null ? Number(year) : now.getFullYear();

    console.log("Guardando month:", resolvedMonth, "year:", resolvedYear);

    const result = await upsertRastreoVentasRepository({
      ...rest,
      month: resolvedMonth,
      year: resolvedYear,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardando rastreo de ventas" });
  }
};
