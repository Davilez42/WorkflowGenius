function dashboardTempleteModel(name,description,id_aut){return  {
        name,
        description,
        id_aut,
        sesions:[
            {
                name:"todo",
                tasks:[
                    {

                        title:"Welcome to ad tasker",
                        description:"welcome!!!"
                    }
                ]
            },
            {
                name:"inprogress",
                tasks:[
                    {

                        title:"tasks in progress...",
                        description:"progress"
                    }
                ]
            },{
                name:"terminate",
                tasks:[
                    {

                        title:"tasks terminated...",
                        description:"terminated"
                    }
                ]
            }
        ]
}}

module.exports = {
    dashboardTempleteModel
}