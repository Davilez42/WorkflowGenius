const deleteDashboard = ({ dashboardService, userService, dashboardResponses }) => async (req, res) => {
    const { id_user } = req
    const { id_dashboard } = req.params
    try {
        const dash_db = await dashboardService.getDashboardById(id_dashboard);
        if (!dash_db) {
            return res.status(404).json({ message: dashboardResponses.dashboardNotFound() })
        }
        const info_member = dash_db.members.find(u => u.user.toString() === id_user)

        if (!info_member || info_member.role !== 'admin') {
            return res.status(403).json({ message: dashboardResponses.insufficientPermits() })
        }

        await dashboardService.deleteDashboard(id_dashboard, id_user)

        res.status(200).json({
            success: true
        })
    } catch (e) {
        return res.status(500).json({
            message: "Server error internal"
        })
    }
}



module.exports = deleteDashboard