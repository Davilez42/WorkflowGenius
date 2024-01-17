import resoruce from "../services/resource"

const useDashboard = () => {

    return {
        getDashboards: async (tkn, callback) => {
            try {
                const resp = await resoruce({ route: 'dashboard/get_dashboard', tkn })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(undefined, data.errorMessage)

                }
                if (!data.success) {
                    return callback(undefined, data.status)

                }

                callback(data)
            } catch (e) {
                console.log(e);
                callback(undefined, e.message)
            }
        },
        createDashboard: async (tkn, dashboarddata, callback) => {
            try {
                const resp = await resoruce({ route: 'dashboard/create_dashboard', body: dashboarddata, method: 'PUT', tkn })
                const data = await resp.json()

                if (!resp.ok) {
                    return callback(undefined, data.errorMessage)
                }
                if (!data.success) {
                    return callback(undefined, data.message)
                }

                callback(data)
            } catch (e) {
                console.log(e);
                callback(undefined, e.message)
            }
        },
        deleteDashboard: async (tkn, id_dashboard, callback) => {
            try {
                const resp = await resoruce({ route: `dashboard/delete_dashboard/${id_dashboard}`, method: 'DELETE', tkn })
                const data = await resp.json()

                if (!resp.ok) {
                    return callback(undefined, data.errorMessage)
                }
                if (!data.success) {
                    return callback(undefined, data.message)
                }

                callback(data)
            } catch (e) {
                console.log(e);
                callback(undefined, e.message)
            }
        }
    }
}


export default useDashboard