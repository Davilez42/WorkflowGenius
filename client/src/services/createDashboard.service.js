export async function createDashboardService(setDashboards, name, dash) {
  //inserto en la base de datos
  const response = await fetch(
    `http://localhost:5000/api/v1/dashboard/create_dashboard`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ name, description: " " }),
    }
  );

  if (response.ok) {
    const resp = await response.json();
    setDashboards([...dash, resp.data.dash_new]);
  } else {
    alert(
      `No se pudo agregar el nuevo tablero "${name}" debido  un error interno`
    );
  }
}
