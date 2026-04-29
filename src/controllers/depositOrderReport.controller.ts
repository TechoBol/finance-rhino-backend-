import { Request, Response } from "express";
import {
  createManyMoneyCollentionsRepository,
  deleteMoneyCollectionsByDepositOrderIdRepository,
  getAllMoneyCollectionFromDepositOrderRepository,
} from "../repository/moneyCollection.repository";
import {
  createManyExpensesRepository,
  deleteExpensesByDepositOrderIdRepository,
  getAllExpensesFromDepositOrderRepository,
} from "../repository/expense.repository";
import {
  createManyDollarsRepository,
  deleteDollarsByDepositOrderIdRepository,
  getAllDollarsFromDepositOrderRepository,
} from "../repository/dollar.repository";
import {
  createManyEnvelopesRepository,
  deleteEnvelopesByDepositOrderIdRepository,
  getAllEnvelopesFromDepositOrderRepository,
} from "../repository/envelope.repository";
import {
  createManyDepositsRepository,
  deleteDepositsByDepositOrderIdRepository,
  getAllDepositsFromDepositOrderRepository,
} from "../repository/deposit.repository";
import jwt from "jsonwebtoken";
import { createDepositOrderHistory } from "../repository/history";
import { getOneDespositOrderRepository } from "../repository/depositOrder.repository";

export const createDepositOrderReport = async (req: Request, res: Response) => {
  try {
    const {
      moneyCollections,
      expenses,
      dollars,
      envelopes,
      deposits,
      depositOrderId,
    } = req.body;
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      res.status(401).json({ message: "Token requerido" });
    }
    const user = jwt.verify(token, process.env.JWTSECRET!) as any;
    await createManyMoneyCollentionsRepository(moneyCollections);
    await createManyExpensesRepository(expenses);
    await createManyDollarsRepository(dollars);
    await createManyEnvelopesRepository(envelopes);
    await createManyDepositsRepository(deposits);

    const newMoneyCollections =
      await getAllMoneyCollectionFromDepositOrderRepository(
        Number(depositOrderId),
      );
    const newExpenses = await getAllExpensesFromDepositOrderRepository(
      Number(depositOrderId),
    );
    const newDollars = await getAllDollarsFromDepositOrderRepository(
      Number(depositOrderId),
    );
    const newEnvelopes = await getAllEnvelopesFromDepositOrderRepository(
      Number(depositOrderId),
    );
    const newDeposits = await getAllDepositsFromDepositOrderRepository(
      Number(depositOrderId),
    );
    const depositOrder = await getOneDespositOrderRepository(
      Number(depositOrderId),
    );
    await createDepositOrderHistory(
      Number(depositOrderId),
      depositOrder!.orderNumber,
      "DELIVERED",
      user.id,
      {
        moneyCollections: newMoneyCollections,
        expenses: newExpenses,
        dollars: newDollars,
        envelopes: newEnvelopes,
        deposits: newDeposits,
      },
    );
    return res.status(201).json({
      moneyCollections: newMoneyCollections,
      expenses: newExpenses,
      dollars: newDollars,
      envelopes: newEnvelopes,
      deposits: newDeposits,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateDepositOrderReport = async (req: Request, res: Response) => {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      res.status(401).json({ message: "Token requerido" });
    }
    const user = jwt.verify(token, process.env.JWTSECRET!) as any;
    const {
      moneyCollections,
      expenses,
      dollars,
      envelopes,
      deposits,
      depositOrderId,
    } = req.body;

    // 🔥 1. ELIMINAR TODO LO ANTERIOR
    await deleteMoneyCollectionsByDepositOrderIdRepository(
      Number(depositOrderId),
    );
    await deleteExpensesByDepositOrderIdRepository(Number(depositOrderId));
    await deleteDollarsByDepositOrderIdRepository(Number(depositOrderId));
    await deleteEnvelopesByDepositOrderIdRepository(Number(depositOrderId));
    await deleteDepositsByDepositOrderIdRepository(Number(depositOrderId));

    // 🔥 2. CREAR NUEVAMENTE
    await createManyMoneyCollentionsRepository(moneyCollections);
    await createManyExpensesRepository(expenses);
    await createManyDollarsRepository(dollars);
    await createManyEnvelopesRepository(envelopes);
    await createManyDepositsRepository(deposits);

    // 🔥 3. OBTENER NUEVOS DATOS
    const newMoneyCollections =
      await getAllMoneyCollectionFromDepositOrderRepository(
        Number(depositOrderId),
      );

    const newExpenses = await getAllExpensesFromDepositOrderRepository(
      Number(depositOrderId),
    );

    const newDollars = await getAllDollarsFromDepositOrderRepository(
      Number(depositOrderId),
    );

    const newEnvelopes = await getAllEnvelopesFromDepositOrderRepository(
      Number(depositOrderId),
    );

    const newDeposits = await getAllDepositsFromDepositOrderRepository(
      Number(depositOrderId),
    );
    const depositOrder = await getOneDespositOrderRepository(
      Number(depositOrderId),
    );
    await createDepositOrderHistory(
      Number(depositOrderId),
      depositOrder!.orderNumber,
      "UPDATED",
      user.id,
      {
        moneyCollections: newMoneyCollections,
        expenses: newExpenses,
        dollars: newDollars,
        envelopes: newEnvelopes,
        deposits: newDeposits,
      },
    );
    return res.status(200).json({
      moneyCollections: newMoneyCollections,
      expenses: newExpenses,
      dollars: newDollars,
      envelopes: newEnvelopes,
      deposits: newDeposits,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
