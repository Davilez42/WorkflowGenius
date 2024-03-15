const { dashboardService } = require("../../database/services");

module.exports = dashboardEvents = (client, users_online, io) => {


    const info_dash_online = {

    }


    client.on("listen-dashboard", async (body) => {
        const { id_dashboard } = body;
        try {

            const id_user = client.handshake.id_user
            if (!info_dash_online[id_dashboard]) {
                const dash = await dashboardService.getDashboardById(id_dashboard)

                info_dash_online[id_dashboard] = dash.members
            }
            if (info_dash_online[id_dashboard].some(u => u.user._id.toString() === id_user)) {
                client.join(id_dashboard)
            } else {
                client.emit("server-error", { errorMessage: 'you is not member of the this dashboard' });
            }
            io.to(id_dashboard).emit('refresh-state-members', { members: info_dash_online[id_dashboard] })
        } catch (e) {
            client.emit("server-error", { errorMessage: 'Internal error' });
        }
    })

    //? CREATE A TASK
    client.on("create-task", async (body) => {
        try {
            const { id_dashboard, id_section, title } = body.data;

            const task_created = await dashboardService.setTaskInSection(
                id_dashboard,
                id_section,
                title
            );
            io.to(id_dashboard).emit(`${id_dashboard}-task-created-${id_section}`, { data: task_created });

            console.log(`👤 a user CREATE a Task ID: ${client.id}`);
        } catch (e) {
            client.emit("server-error", { errorMessage: 'Internal error' });
        }
    });
    //? DELETE  A TASK
    client.on("delete-task", async (body) => {

        try {
            const { id_dashboard, id_section, id_task } = body.data;

            await dashboardService.deleteTaskOfSection(
                id_dashboard,
                id_section,
                id_task
            );

            io.to(id_dashboard).emit(`${id_dashboard}-task-deleted-${id_section}`, { id_task })
            console.log(`👤 a user DELETE a Task ID: ${client.id}`);
        } catch (e) {
            client.emit("server-error", { errorMessage: 'Internal error' });
        }
    });

    //? MOVE A TASK
    client.on("move-task", async (body) => {
        try {
            const { id_dashboard, from_section, to_section, id_task } = body.data;
            const task_moved = await dashboardService.moveTask(
                id_dashboard,
                from_section,
                to_section,
                id_task
            );
            io.to(id_dashboard).emit(`${id_dashboard}-task-created-${to_section}`, { data: task_moved });
            io.to(id_dashboard).emit(`${id_dashboard}-task-deleted-${from_section}`, { id_task })
            console.log(`👤 a user MOVE a Task ID: ${client.id}`);
        } catch (e) {
            console.log(e);
            client.emit("server-error", { errorMessage: 'Internal error' });
        }
    });


    //? CREATE A SECTION
    client.on('create-session', async (body) => {
        try {
            const { id_dashboard, name } = body.data;

            const section_insert = await dashboardService.setSection(id_dashboard, name);
            io.to(id_dashboard).emit('session-created', {
                section_insert
            })
            console.log(`👤 a user CREATE a Session ID: ${client.id}`);
        } catch (e) {
            client.emit("server-error", { errorMessage: 'Internal error' });
        }
    })

    //? DELETE A SECTION
    client.on('delete-session', async (body) => {
        try {
            const { id_section, id_dashboard } = body;

            await dashboardService.deleteSection(id_section, id_dashboard);
            io.to(id_dashboard).emit('session-deleted', {
                id_section,
                id_dashboard
            })
            console.log(`👤 a user DELETE a Session ID: ${client.id}`);
            return;
        } catch (e) {
            console.log(e);
            client.emit("server-error", { errorMessage: 'Internal error' });
        }
    })
}