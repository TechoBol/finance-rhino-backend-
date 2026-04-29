import io from 'socket.io'

const envelopeSocketInstace = (io: io.Server) => {
  io.on('connection', socket => {
    socket.on('createEnvelopes', newEnvelopes => {
      socket.broadcast.emit('newEnvelopes', newEnvelopes)
    })
  })
}

export default envelopeSocketInstace
