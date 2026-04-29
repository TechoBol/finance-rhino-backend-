import io from 'socket.io'

const dollarSocketInstace = (io: io.Server) => {
  io.on('connection', socket => {
    socket.on('createDollars', newDollars => {
      socket.broadcast.emit('newDollars', newDollars)
    })
  })
}

export default dollarSocketInstace
