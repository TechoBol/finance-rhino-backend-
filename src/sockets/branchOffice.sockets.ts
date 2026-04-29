import io from 'socket.io'

const branchOfficeSocketInstance = (io: io.Server) => {
  io.on('connection', socket => {
    socket.on('createBranchOffice', newBranchOffice => {
      socket.broadcast.emit('newBranchOffice', newBranchOffice)
    })

    socket.on('deleteBranchOffice', deletedBranchOffice => {
      socket.broadcast.emit('deletedBranchOffice', deletedBranchOffice)
    })

  })
}


export default branchOfficeSocketInstance