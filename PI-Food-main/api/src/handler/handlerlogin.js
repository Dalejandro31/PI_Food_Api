const {Users} = require("../db");
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR = 404;


async function loginUsuarios(req, res) {
    const { email, password } = req.body;

    try {
      const userLogin = await Users.findOne({ where: { email, password } });
      if (userLogin) {
        return res.status(STATUS_CREATED).json({
          message: 'Logueado con éxito',
          email,
        });
      }
      return res.status(STATUS_ERROR).json({ message: 'Usuario no encontrado' });
    } catch (error) {
      return res.status(STATUS_ERROR).json({ message: 'Error al autenticar al usuario' });
  
    }
  }
  module.exports = {
    loginUsuarios,
  };