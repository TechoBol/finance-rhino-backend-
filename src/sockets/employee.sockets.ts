import io from 'socket.io'

const employeeSocketInstace = (io: io.Server) => {
  io.on('connection', socket => {
    socket.on('createEmployee', newEmployee => {
      socket.broadcast.emit('newEmployee', newEmployee)
    })

    socket.on('deleteEmployee', deletedEmployee => {
      socket.broadcast.emit('deletedEmployee', deletedEmployee)
    })
  })
}

export default employeeSocketInstace
