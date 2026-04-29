import io from "socket.io";

const purchaseAssetsSocketInstance = (io: io.Server) => {
  io.on("connection", (socket) => {
    socket.on("createPurchaseAsset", (updatedProject) => {
      io.sockets.emit("updatedProject", updatedProject);
    });

    socket.on("createProject", (newProject) => {
      socket.broadcast.emit("newProject", newProject);
    });

    socket.on("createExtraExpense", (extraExpense) => {
      io.sockets.emit("extraExpense", extraExpense);
    });

    socket.on("createCashFlow", (cashFlow) => {
      io.sockets.emit("cashFlow", cashFlow);
    });
    socket.on("updateRastreo", (rastreo) => {
      io.sockets.emit("rastreo", rastreo);
    });
    socket.on("createFondoAvance", (fondoAvance) => {
      io.sockets.emit("fondoAvance", fondoAvance);
    });
    socket.on("deleteFondoAvance", (id: number) => {
      io.sockets.emit("deleteFondoAvance", id);
    });
  });
};

export default purchaseAssetsSocketInstance;
