import express, { urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import authenticationRoute from '../routes/authentication.routes'

import regionalsRoute from '../routes/regionalOffice.routes'
import employeeRoute from '../routes/employee.routes'
import depositOrderRoute from '../routes/depositOrder.routes'
import roleRoute from '../routes/role.routes'
import branchOfficeRoute from '../routes/branchOffice.routes'
import account from '../routes/account.routes'
import subAccount from '../routes/subAccount.routes'
import depositOrderBranchOffice from '../routes/depositOrderBranchOffice.routes'

import depositOrderReport from '../routes/depositOrderReport.routes'
import moneyCollection from '../routes/moneyCollection.routes'
import expense from '../routes/expense.routes'
import dollar from '../routes/dollar.routes'
import envelope from '../routes/envelope.routes'
import deposit from '../routes/deposit.routes'
import extraExpenses from '../routes/extrasExpenses.routes'
import cashFlow from '../routes/cashFlow.routes'
import banks from '../routes/banks.routes'
import payer from '../routes/payer.routes'
import fondoAvance from '../routes/fondoAvance.routes'
import rastreoVentas from '../routes/rastreoVentas.routes'

import { verifyToken } from '../middleware/auth.middleware'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use('/api/authentication', authenticationRoute)
app.use('/api/deposit-order', verifyToken, depositOrderRoute)

app.use('/api/role', verifyToken, roleRoute)
app.use('/api/regional', verifyToken, regionalsRoute)

app.use('/api/employee', verifyToken, employeeRoute)
app.use('/api/branch-office', verifyToken, branchOfficeRoute)
app.use('/api/account', verifyToken, account)
app.use('/api/sub-account', verifyToken, subAccount)
app.use(
  '/api/deposit-order-branch-office',
  verifyToken,
  depositOrderBranchOffice
)

app.use('/api/deposit-order-report', verifyToken, depositOrderReport)
app.use('/api/money-collection', verifyToken, moneyCollection)
app.use('/api/expense', verifyToken, expense)
app.use('/api/dollar', verifyToken, dollar)
app.use('/api/envelope', verifyToken, envelope)
app.use('/api/deposit', verifyToken, deposit)
app.use('/api/extra-expenses', verifyToken,extraExpenses)
app.use('/api/cash-flow' , verifyToken , cashFlow)
app.use('/api/banks' , verifyToken , banks)
app.use('/api/payer' , verifyToken , payer)
app.use('/api/fondos-avance' , verifyToken , fondoAvance)
app.use('/api/rastreo-ventas' , verifyToken , rastreoVentas)

export default app
