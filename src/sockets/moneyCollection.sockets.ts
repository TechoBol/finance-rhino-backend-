import io from 'socket.io'

const moneyCollectionSocketInstace = (io: io.Server) => {
  io.on('connection', socket => {
    socket.on('createMoneyCollections', newMoneyCollections => {
      socket.broadcast.emit('newMoneyCollections', newMoneyCollections)
    })
  })
}

export default moneyCollectionSocketInstace
