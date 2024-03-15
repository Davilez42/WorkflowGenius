const { Server } = require("socket.io");
const dashboardEvents = require('./dashboardEvents/dashboard.events')
const { verify, decode } = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const socketMain = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (client) => {
    console.log(`👤 a user connected ID:`, client.id);
    client.on("disconnect", () => {
      console.log(`👤 a user Disconnected ID: ${client.id}`);
    });
  });


  const users_online = {}

  io.use((client, next) => {//verify token
    try {
      const token = client.handshake.auth.token
      verify(token, process.env.JWT_KEY_SECRET)
      const { _id } = decode(token)
      users_online[_id] = client.id
      client.handshake.id_user = _id
      next()
    } catch (error) {
      next(new Error('Invalid token'))
    }
  })
  io.use((client, next) => {// decorador de eventos dashboard
    dashboardEvents(client, users_online, io)
    next()
  })




};

module.exports = socketMain;
