import io from 'socket.io'

const depositOrderSocketInstace = (io: io.Server) => {
  io.on('connection', socket => {
    // socket.on('createDepositOrder', newDepositOrder => {})
    socket.on('cancelDepositOrder', canceledDepositOrder => {
      socket.emit('canceledDepositOrder', canceledDepositOrder)
    })

    socket.on('updateDepositOrder', updatedDepositOrder => {
      io.sockets.emit('updatedDepositOrder', updatedDepositOrder)
    })

    socket.on('createDepositOrder', newDepositOrder => {
      socket.broadcast.emit('newDepositOrder', newDepositOrder)
    })

  })
}

export default depositOrderSocketInstace
