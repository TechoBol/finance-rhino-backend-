import { Router } from "express";
import {
  getAllFondosAvance,
  createFondoAvance,
  deleteFondoAvance,
} from "../controllers/fondoAvance.controller";

const router = Router();

router.get("/fondos-avance", getAllFondosAvance);
router.post("/fondos-avance", createFondoAvance);
router.delete("/fondos-avance/:id", deleteFondoAvance);

export default router;