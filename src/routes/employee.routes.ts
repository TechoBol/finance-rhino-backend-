import { Router } from 'express'
import { getAllEmployees, createEmployee, updateVisibilityEmployee } from '../controllers/employee.controller'

const router = Router()

router.get('/employees', getAllEmployees)
router.post('/create-employee', createEmployee)
router.put('/delete-employee/:id', updateVisibilityEmployee)

export default router