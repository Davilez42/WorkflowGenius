const { Server } = require("socket.io");
const dashboardEvents = require('./dashboardEvents/dashboard.events')

const socketMain = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  //? Events sockets
  io.on("connection", (client) => {
    console.log(`👤 a user connected ID: ${client.id}`);
    client.on("disconnect", () => {
      console.log(`👤 a user Disconnected ID: ${client.id}`);
    });

    //* decorador de eventos dashboard
    dashboardEvents(client)

    //* decorador eventos mensajes TODO


  });
};

module.exports = socketMain;
