import { Request, Response } from "express";
import {
  createDepositOrder,
  getOneDespositOrderRepository,
  updateStatusAndReportURLAtCreatedReport,
  updateRevitionStatusRepository,
  getAllDepositOrdersByRegional as getAllDepositOrdersByRegionalRepository,
  updateDepositOrder,
  deleteDepositOrderBranchOfficeByOrderId,
} from "../repository/depositOrder.repository";
import { getAllDespositOrders as getDespositOrders } from "../repository/depositOrder.repository";
import { cancelDepositOrder as cancelDepositRepository } from "../repository/depositOrder.repository";
import { updateDepositOrderNumberInRegionalOffice } from "../repository/regionalOffice.repository";
import { createManyDepositOrderBranchOffice } from "../repository/depositOrderBranchOffice.repository";

import { DepositOrderBranchOffice } from "@prisma/client";
import { createDepositOrderHistory } from "../repository/history";
import jwt from "jsonwebtoken";

export const createNewDepositOrder = async (req: Request, res: Response) => {
  try {
    const depositData = req.body.depositOrderBody;
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      res.status(401).json({ message: "Token requerido" });
    }
    const user = jwt.verify(token, process.env.JWTSECRET!) as any;
    const newDespositOrder = await createDepositOrder(depositData);
    await updateDepositOrderNumberInRegionalOffice(depositData.regionalId);
    const branchOfficeBody = req.body.deposiOrderBranchOfficeBody;
    const branchOfficeData = branchOfficeBody.map(
      (element: DepositOrderBranchOffice) => ({
        depositOrderId: newDespositOrder.id,
        branchOfficeId: Number(element.branchOfficeId),
        amount: element.amount,
      }),
    );
    await createManyDepositOrderBranchOffice(branchOfficeData);
    await createDepositOrderHistory(
      newDespositOrder.id,
      depositData.orderNumber,
      "CREATED",
      user.id,
      { ...depositData, branchOffices: branchOfficeBody },
    );
    return res.status(200).json(newDespositOrder);
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message });
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDespositOrders = async (_req: Request, res: Response) => {
  try {
    const depositOrders = await getDespositOrders();
    res.status(200).json(depositOrders);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelDepositOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.headers["x-access-token"] as string;
    const { reason } = req.body; 
    if (!token) {
      res.status(401).json({ message: "Token requerido" });
    }
    const user = jwt.verify(token, process.env.JWTSECRET!) as any;
    const depositOrder = await cancelDepositRepository(Number(id));
    await createDepositOrderHistory(
      Number(id),
      depositOrder.orderNumber,
      "CANCELLED",
      user.id,
      { ...depositOrder, branchOffices: depositOrder },
      reason
    );
    res.status(200).json(depositOrder);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getAllDepositOrdersByRegional = async (
  req: Request,
  res: Response,
) => {
  try {
    const { regional } = req.params;
    const depositOrders =
      await getAllDepositOrdersByRegionalRepository(regional);
    res.status(200).json(depositOrders);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOneDespositOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const depositOrder = await getOneDespositOrderRepository(Number(id));
    res.status(200).json(depositOrder);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStatusAndReportURLAtCreateReport = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    await getOneDespositOrderRepository(Number(id));
    const depositOrder = await updateStatusAndReportURLAtCreatedReport(
      Number(id),
      req.body,
    );
    res.status(200).json(depositOrder);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRevitionStatus = async (req: Request, res: Response) => {
  try {
    const { revisionStatus } = req.body;
    const { id } = req.params;
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      res.status(401).json({ message: "Token requerido" });
    }
    const user = jwt.verify(token, process.env.JWTSECRET!) as any;
    const depositOrder = await updateRevitionStatusRepository(
      Number(id),
      revisionStatus,
      user
    );
    const status =
      revisionStatus === "Aprobado"
        ? "APPROVED"
        : revisionStatus === "Observado"
          ? "OBSERVED"
          : "PENDING";
    await createDepositOrderHistory(
      Number(id),
      depositOrder.depositOrder.orderNumber,
      status,
      user.id,
      { ...depositOrder, branchOffices: depositOrder },
    );
    res.status(200).json(depositOrder);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDepositOrderController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const depositData = req.body.depositOrderBody;
    const branchOfficeBody = req.body.deposiOrderBranchOfficeBody;
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      res.status(401).json({ message: "Token requerido" });
    }
    const user = jwt.verify(token, process.env.JWTSECRET!) as any;
    const updatedDepositOrder = await updateDepositOrder(
      Number(id),
      depositData,
    );
    await deleteDepositOrderBranchOfficeByOrderId(Number(id));
    const branchOfficeData = branchOfficeBody.map(
      (element: DepositOrderBranchOffice) => ({
        depositOrderId: Number(id),
        branchOfficeId: Number(element.branchOfficeId),
        amount: element.amount,
      }),
    );
    await createManyDepositOrderBranchOffice(branchOfficeData);
    await createDepositOrderHistory(
      updatedDepositOrder.id,
      depositData.orderNumber,
      "UPDATED",
      user.id,
      { ...depositData, branchOffices: branchOfficeBody },
    );
    return res.status(200).json(updatedDepositOrder);
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message });

    return res.status(500).json({ message: "Internal server error" });
  }
};
