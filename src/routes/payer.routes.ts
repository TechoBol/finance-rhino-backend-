import { Router } from "express";
import { changeVisibilityPayer, createPayerController, getAllPayers } from "../controllers/payer.controller";

const router = Router();

router.post("/create-payer", createPayerController);
router.get('/payers', getAllPayers)
router.put('/delete-payer/:id', changeVisibilityPayer)
export default router;
