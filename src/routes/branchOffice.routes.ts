import { Router } from 'express'
import { getAllBranchOffices, createBranchOffice, updateVisibilityBranchOffice } from '../controllers/branchOffice.controller'

const router = Router()

router.get('/branch-offices', getAllBranchOffices)
router.post('/create-branch-office', createBranchOffice)
router.put('/delete-branch-office/:id', updateVisibilityBranchOffice)

export default router