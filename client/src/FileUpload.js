const sendFile = async  event  =>{
    const archivo =  event.target.files
    //verifico
    ar = archivo[0]
    if (!["image/png","image/jpeg"].includes(ar.type)){
        alert("Porfavor sube una imagen!")
        return
    }

    const data = new FormData();

    data.append("archivo",archivo[0]);
    const resp = await fetch("http://localhost:5000/upload_file",{
        method:"POST",
        body:data
    })

    if(!resp.ok){
        alert("el archivo NO fue subido, hubo un error")
        return
    } 
    alert("el archivo  fue subido con exito")



}


document.querySelector("#archivo").addEventListener('change',event=>{
  document.querySelector("#send").addEventListener('click',()=> sendFile(event));
        
});
