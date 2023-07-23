export async function getDashboards(setDashboards) {
  const response = await fetch(
    `http://localhost:5000/api/v1/dashboard/get_dashboard`,{
      method:'GET',
      credentials:'include',
      mode:'cors'
    }
  );
  if (response.ok) {
    const data = await response.json();
    const dashboards =  data.data.dashboards_user
    setDashboards(dashboards)
  }else{
    const resp = await response.json();
    console.log(resp);
  }
}
