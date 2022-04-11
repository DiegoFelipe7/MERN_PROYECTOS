const Usuarios = require("../models/Usuarios");
const generadId = require("../helpers/generarId");
const generarJWT = require("../helpers/generarJWT");
const emailRegistro = require("../helpers/email");
const nuevoPassword = require("../helpers/password");
exports.getUsuarios = (req, res) => {
  res.status(201).json({ msg: "hola" });
};

exports.crearUsuario = async (req, res) => {
  const { email } = req.body;
  Usuarios.findOne({ email: email })
    .then((result) => {
      if (result) {
        res.status(500).json("usuario existe");
      } else {
        const usuarios = new Usuarios({
          nombre: req.body.nombre,
          password: req.body.password,
          email: req.body.email,
          token: generadId(),
        });
        usuarios
          .save()
          .then((userResult) => {
            res.status(201).json({ msg: "Usuario Creado Exitosa mente!" });
            emailRegistro({
              email: userResult.email,
              nombre: userResult.nombre,
              token: userResult.token,
            });
          })
          .catch((err) => {
            res.status(500).json({ msg: "Ocurrio un erro" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Este correo ya existe" });
    });
};
exports.autenticar = async (req, res) => {
  const { email, password } = req.body;
  //comprar si el usuario existe
  const usuarios = await Usuarios.findOne({ email: email });
  //Validar si el usuario existe
  if (!usuarios) {
    res.status(404).json({ msg: "El usuario no existes" });
  }
  if (usuarios.confirmar === false) {
    res.status(404).json({ msg: "El usuario esta inactivo" });
  }

  //validar la contraseña
  if (await usuarios.comprobarPassword(password)) {
    const usu = {
      _id: usuarios.id,
      nombre: usuarios.nombre,
      email: usuarios.email,
      token: "",
      token: generarJWT(usuarios.id),
    };
    res.status(201).json(usu);
  } else {
    res.status(404).json({ msg: "Contraseña incorrecta" });
  }
};

exports.confirmarToken = async (req, res) => {
  const { token } = req.params;
  Usuarios.findOne({ token: token })
    .then((tokenResult) => {
      if (!tokenResult) {
        res.status(404).json({ msg: "Token no valido" });
      } else {
        tokenResult.confirmado = true;
        tokenResult.token = "";
        tokenResult
          .save()
          .then((user) => {
            res.json({ msg: "Token confirmado" });
          })
          .catch((err) => {
            res.status(404).json({ msg: "Ocurrio un error" });
          });
      }
    })
    .catch((err) => {
      const error = new Error("Ocurrio un error");
      res.status(404).json({ msg: error.message });
    });
};

exports.olvidePassword = (req, res) => {
  const { email } = req.body;
  Usuarios.findOne({ email: email })
    .then((result) => {
      if (!result) {
        res.status(500).json({ msg: "Este correo no se existe" });
      } else {
        result.token = generarJWT(result._id);
        result
          .save()
          .then((userResult) => {
            res.status(201).json({
              msg: " Hemos enviado un correo de confirmacion a tu email",
            });
            nuevoPassword({
              email: userResult.email,
              nombre: userResult.nombre,
              token: userResult.token,
            });
          })
          .catch((err) => {
            res.status(400).json({ msg: "Ocurrio un erro" });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ msg: "Ocurrio un error" });
    });
};

exports.comprovarToken = (req, res) => {
  const { token } = req.params;
  Usuarios.findOne({ token: token })
    .then((tokenReult) => {
      if (tokenReult) {
        res.json({ msg: "token valido ingresa un nuevo password" });
      } else {
        res.status(404).json({ msg: "Token invalido" });
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: "Ocurrio un error" });
    });
};
exports.nuevoPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  Usuarios.findOne({ token: token })
    .then((result) => {
      if (result) {
        result.token = "";
        result.password = password;
        result
          .save()
          .then((resultUser) => {
            res.status(200).json({ msg: "Password actualizado correctamente" });
          })
          .catch((err) => {
            res.status(404).json({ msg: "ocurrio un error" });
          });
      } else {
        res.status(404).json({ msg: "Ocurrio un error con el token" });
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: "ocurrio un error" });
    });
};

exports.perfil = (req, res) => {
  const { usuario } = req;
  res.status(200).json(usuario);
};
