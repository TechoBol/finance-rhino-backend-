import app from './config/server'
import { config } from 'dotenv'

import http from 'http'
import { Server as SocketServer } from 'socket.io'
import employeeSocketInstace from './sockets/employee.sockets'
import branchOfficeSocketInstance from './sockets/branchOffice.sockets'
import accountSocketInstance from './sockets/account.sockets'
import subAccountSocketInstance from './sockets/subAccount.sockets'
import depositOrderSocketInstace from './sockets/depositOrder.sockets'

import moneyCollectionSocketInstace from './sockets/moneyCollection.sockets'
import expenseSocketInstace from './sockets/expense.sockets'
import envelopeSocketInstace from './sockets/envelope.sockets'
import dollarSocketInstace from './sockets/dollar.sockets'
import depositSocketInstace from './sockets/deposit.sockets'
import purchaseAssetsSocketInstance from './sockets/purchaseAssets.sockets'

config()

const port = process.env.PORT

const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: `*`
  }
})
io.setMaxListeners(20)
employeeSocketInstace(io)
branchOfficeSocketInstance(io)
accountSocketInstance(io)
subAccountSocketInstance(io)
depositOrderSocketInstace(io)

moneyCollectionSocketInstace(io)
expenseSocketInstace(io)
envelopeSocketInstace(io)
dollarSocketInstace(io)
depositSocketInstace(io)
purchaseAssetsSocketInstance(io)

io.on('connection', socket => {
  console.log('a user connected ' + socket.id)
})

const host = '0.0.0.0'

server.listen({ port, host }, () => {
  console.log(`Server running on port ${port}`)
})