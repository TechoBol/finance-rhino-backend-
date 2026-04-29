import io from 'socket.io'

const subAccountSocketInstance = (io: io.Server) => {
  io.on('connection', socket => {
    socket.on('createSubAccount', newSubAccount => {
      socket.broadcast.emit('newSubAccount', newSubAccount)
    })

    socket.on('deleteSubAccount', deletedSubAccount => {
      socket.broadcast.emit('deletedSubAccount', deletedSubAccount)
    })

  })
}

export default subAccountSocketInstance