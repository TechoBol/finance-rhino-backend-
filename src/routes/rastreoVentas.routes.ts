import { Router } from "express";
import { getRastreoVentas, upsertRastreoVentas } from "../controllers/rastreoVentas.controller";

const router = Router();

router.get("/rastreo-ventas", getRastreoVentas);
router.post("/rastreo-ventas", upsertRastreoVentas);

export default router;