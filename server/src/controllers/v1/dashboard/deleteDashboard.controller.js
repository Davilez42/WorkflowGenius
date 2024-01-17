
const deleteDashboard = ({ dashboardService, dashboardResponses }) => async (req, res) => {
    const { id_user } = req
    const { id_dashboard } = req.params
    try {
        const dash_db = await dashboardService.getDashboardById(id_dashboard);

        if (!dash_db) {
            return res.status(404).json({ message: dashboardResponses.dashboardNotFound() })
        }

        if (dash_db.id_aut.toString() !== id_user) {
            return res.status(403).json({ message: dashboardResponses.insufficientPermits() })
        }
        await dashboardService.deleteDashboard(id_dashboard)

        res.status(200).json({
            success: true
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server error internal"
        })
    }
}



module.exports = deleteDashboard