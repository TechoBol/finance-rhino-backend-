import { Router } from "express";
import { createCashFlow, getAllCashFlow, updateCashFlow } from "../controllers/cashFlow.controller";


const router = Router();

router.get("/cash-flow", getAllCashFlow);
router.post("/create-cash-flow", createCashFlow);
router.put("/cash-flow/:id", updateCashFlow);
export default router;