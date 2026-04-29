import {Router} from 'express'
import { getRegionals } from '../controllers/regionalOffice.controllers'

const router = Router()

router.get('/regionals', getRegionals)

export default router