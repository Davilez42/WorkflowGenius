const logger = (req, res, next) => {
  console.log(
    ` IP: ${req.ip.green}  METHOD:${req.method.red}  ROUTE: ${req.url.blue}`
  );
  next();
};
module.exports = logger;
