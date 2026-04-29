import io from 'socket.io'

const expenseSocketInstace = (io: io.Server) => {
  io.on('connection', socket => {
    socket.on('createExpenses', newExpenses => {
      socket.broadcast.emit('newExpenses', newExpenses)
    })
  })
}

export default expenseSocketInstace
