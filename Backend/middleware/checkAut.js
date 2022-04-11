const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuarios");
const checkAut = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //TOMA EL JWTO E INGONARA EL BEADER
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //DECODIICA EL JWTOKE
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );

      return next();
    } catch (error) {
      res.status(400).json({ msg: "ocurrio un error" });
    }
  }
  if (!token) {
    return res.status(401).json({ msg: "Error en el token" });
  }
  next(); //va a l siguiente paso en este caso el del controlador
};

module.exports = checkAut;
