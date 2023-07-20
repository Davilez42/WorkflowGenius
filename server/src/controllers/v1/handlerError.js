function handlerError(status, message) {
  this.status =  status ;
  this.message = message;
}
module.exports =  handlerError