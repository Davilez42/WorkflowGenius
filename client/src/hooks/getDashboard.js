
 export  async function getDashboards(f){
  const dashboards_users = [
    {
      nombre: "Tareas universidad",
      _id: 100002,
      sesions: [
        {
          _id:114342424,
          nombre: "Todo",
          tasks: [
            {
              _id:12314324,
              title: "Estudiar parcial ingles",
              description: "estudiar para no perder el parcial de ingles",
            }
          ],
        },
        {
          _id:12314342424,
          nombre: "InProgress",
          tasks: [
            {
              id: 123,
              title: "Mejorando esta app",
              description: "app",
            },
            {
              id: 123,
              title: "Escuchar electronica",
              description: "ver videos de fada el dia de mañana",
            },
            {
              id: 123,
              title: "Estudiar React",
              description: "aprender mas sobre react app",
            },
          ],
        },
        {
          _id:14342424,
          nombre: "Terminate",
          tasks: [
            {
              id: 123,
              title: "Mejorando esta app",
              description: "app",
            }
            
          ],
        }
      ],
    }
   
  ];

    const user = JSON.parse(sessionStorage.getItem('LoggedUser'))
    const resp = await fetch(`http://192.168.1.7:5000/api/v1/getDashboard/${user.id_user}`)
    if(resp.ok){    
      const data = await resp.json()
      f(data)
    }
   
} 
