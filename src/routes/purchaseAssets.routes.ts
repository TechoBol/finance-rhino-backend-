import { Router } from 'express'
import {
  createProject,
  createPurchaseAssetDetail,
  getAllProjects,
  getAllRegionalOffices,updatePurchaseAssetDetail 
} from '../controllers/purchaseAssets.controller'

const router = Router()

router.post('/create-project', createProject)
router.get("/get-projects", getAllProjects);
router.get("/regional-offices", getAllRegionalOffices); 
router.post("/purchase-asset-detail", createPurchaseAssetDetail);
router.put("/purchase-asset-detail/:id", updatePurchaseAssetDetail );
export default router
