export async function createDashboard(setDashboards, name, dash) {
  //inserto en la base de datos
  const respuesta = await fetch(
    `http://localhost:5000/api/v1/dashboard/create_dashboard`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ name, description: " " }),
    }
  );

  if (respuesta.ok) {
    const resp = await respuesta.json();
    setDashboards([...dash, resp.data.dash_new]);
  } else {
    alert(
      `No se pudo agregar el nuevo tablero "${name}" debido  un error interno`
    );
  }
}
