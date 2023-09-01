const { Server } = require("socket.io");
const { dashboardService } = require("../database/services/");

const socketMain = (server) => {
  const io = new Server(server); // inicia el socket con el servidor
  //? Events sockets
  io.on("connection", (client) => {
    console.log(`👤 a user connected ID: ${client.id}`);
    client.on("disconnect", () => {
      console.log(`👤 a user Disconnected ID: ${client.id}`);
    });
    //* Eventos que escucha el socket

    client.on("create-task", async (body) => {
      //? CREATE A TASK
      const { id_dashboard, id_session, title } = body.data;
      try {
        const task_created = await dashboardService.setTaskInDashboard(
          id_dashboard,
          id_session,
          title
        );

        client.emit(`task-created-${id_session}`, { data: task_created });
        console.log(`👤 a user CREATE a Task ID: ${client.id}`);
      } catch (e) {
        client.emit("server-error", { messageError: e.message });
      }
    });

    //? DELETE  A TASK
    client.on("delete-task", async (body) => {
      const { id_dashboard, id_session, id_task } = body.data;
      try {
        await dashboardService.deleteTaskDashboard(
          id_dashboard,
          id_session,
          id_task
        );
        console.log(`👤 a user DELETE a Task ID: ${client.id}`);
      } catch (e) {
        client.emit("server-error", { messageError: e.message });
      }
    });

    //? CREATE A SESSION
    client.on('create-session', async (body) => {
      try {
        const { id_dashboard, name } = body.data;
        const session_insert = await dashboardService.setSession(id_dashboard, name);
        client.emit('session-created', {
          session_insert
        })
      } catch (e) {
        client.emit("server-error", { messageError: e.message });
      }
    })

    //? DELETE A SESSION
    client.on('delete-session', async (body) => {
      try {
        const { id_session, id_dashboard } = body;
        const resp_db = await dashboardService.deleteSession(id_session, id_dashboard);
        client.emit('session-deleted', {
          data: {
            ...resp_db
          }
        })
        return;
      } catch (e) {
        client.emit("server-error", { messageError: e.message });
      }
    })


  });
};

module.exports = socketMain;
