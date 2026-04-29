import { Request, Response } from "express";
import {
  createPurchaseAssetDetailRepository,
  getAllProjectsRepository,
  getAllRegionalOfficesRepository,
  registerProjectRepository,
  updatePurchaseAssetDetailRepository,
} from "../repository/purchaseAssets.repository";

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = await registerProjectRepository(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await getAllProjectsRepository();

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

export const createPurchaseAssetDetail = async (
  req: Request,
  res: Response,
) => {
  try {
    const newData = await createPurchaseAssetDetailRepository(req.body);

    return res.status(201).json(newData);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";

    return res.status(500).json({ message });
  }
};

export const updatePurchaseAssetDetail = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await updatePurchaseAssetDetailRepository({
      id,
      ...data,
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar" });
  }
};
