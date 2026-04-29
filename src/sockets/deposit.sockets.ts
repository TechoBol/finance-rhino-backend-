import io from 'socket.io'

const depositSocketInstace = (io: io.Server) => {
  io.on('connection', socket => {
    socket.on('createDeposits', newDeposits => {
      socket.broadcast.emit('newDeposits', newDeposits)
    })
  })
}

export default depositSocketInstace
