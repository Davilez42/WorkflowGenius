const { dashboardService } = require("../../database/services");

module.exports = dashboardEvents = (client) => {
    client.on("create-task", async (body) => {
        //? CREATE A TASK
        try {
            const { id_dashboard, id_session, title } = body.data;

            const task_created = await dashboardService.setTaskInSession(
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

        try {
            const { id_dashboard, id_session, id_task } = body.data;

            await dashboardService.deleteTaskOfSession(
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
            console.log(`👤 a user CREATE a Session ID: ${client.id}`);
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
            console.log(`👤 a user DELETE a Session ID: ${client.id}`);
            return;
        } catch (e) {
            client.emit("server-error", { messageError: e.message });
        }
    })
}