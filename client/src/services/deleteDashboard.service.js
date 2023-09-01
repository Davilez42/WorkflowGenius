


export async function deleteDashboardService(f, id_dash, dashboards) {

    const resp = await fetch(`http://localhost:5000/api/v1/dashboard/delete_dashboard/${id_dash}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: "include",
    })
    //const resp = await resp.json()

    if (resp.ok) {
        //console.log(resp);
        f(dashboards.filter((d) => d._id !== id_dash));
    } else {
        //console.log(resp);
        alert('No se pudo eliminar el Dashboard')
    }


}