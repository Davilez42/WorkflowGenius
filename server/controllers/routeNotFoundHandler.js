const handlerRoutNotFound = (req,resp)=>{
    resp.status(404).header({"auth":"null","Content-Type":"application/json"}).json({ "error":"La ruta solicitada no se encuentra en el servidor"})
}
module.exports = handlerRoutNotFound