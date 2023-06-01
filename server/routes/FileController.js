class FileController {
  uploadFile = async (req, res, next) => {
    const archivo = req.files.archivo;
    const filename = archivo.name;
    const ruta_guardar = __dirname + "/../uploads/" + filename;
    try {
      archivo.mv(ruta_guardar, (error) => {
        if (error) {
          res.sendStatus(400)
          return;
        }

        res.sendStatus(200)
        return;
      });
    } catch (e) {
      res.status(500).json({
        error: true,
        message: e.toString(),
      });
    }
  };

}

module.exports = FileController;
