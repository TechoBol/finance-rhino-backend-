import Router from 'express'
import {
  getAllMoneyCollections,
  getAllMoneyCollectionFromDepositOrder,
  getAllMoneyCollectionsByRegional
} from '../controllers/moneyCollection.controller'

const router = Router()

router.get('/money-collections', getAllMoneyCollections)
router.get('/money-collections/:id', getAllMoneyCollectionFromDepositOrder)
router.get('/money-collections-by-regional/:regional', getAllMoneyCollectionsByRegional)

export default router
