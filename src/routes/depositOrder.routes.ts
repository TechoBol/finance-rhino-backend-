import { Router } from 'express'
import {
  createNewDepositOrder,
  getAllDespositOrders,
  cancelDepositOrder,
  getOneDespositOrder,
  updateStatusAndReportURLAtCreateReport,
  updateRevitionStatus,
  getAllDepositOrdersByRegional,
  updateDepositOrderController
} from '../controllers/depositOrder.controller'
import { getDepositOrderHistory } from '../controllers/historyOrder.controller'

const router = Router()

router.get('/deposit-orders', getAllDespositOrders)
router.get('/deposit-order/:id', getOneDespositOrder)
router.get('/deposit-orders-by-regional/:regional', getAllDepositOrdersByRegional)
router.post('/create-deposit-order', createNewDepositOrder)
router.put('/cancel-deposit-order/:id', cancelDepositOrder)
router.put('/update-status-report/:id', updateStatusAndReportURLAtCreateReport)
router.put('/update-revision-status/:id', updateRevitionStatus )
router.put("/update-deposit-order/:id", updateDepositOrderController);
router.get('/history/:orderNumber', getDepositOrderHistory)
export default router
