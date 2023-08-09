

const deleteDashboard = ({ dashboardService }) => async (req, res) => {
    const { id_user } = req
    const { id_dashboard } = req.params
    try {

        const dash_db = await dashboardService.getDashboardById(id_dashboard);

        if (!dash_db) {
            return res.status(404).json({ messageError: "The dashboard not exists" })
        }

        if (dash_db.id_aut.toString() !== id_user) {
            return res.status(403).json({
                messageError: "don't permission"
            })
        }
        const resp = await dashboardService.deleteDashboard(id_dashboard)

        res.status(200).json({
            succes: true,
            data: {
                resp
            }
        })
    } catch (e) {
        return res.status(500).json({
            messageError: "Server error internal"
        })
    }
}



module.exports = deleteDashboard