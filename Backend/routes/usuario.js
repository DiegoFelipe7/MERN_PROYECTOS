const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarioController");
const checkAut = require("../middleware/checkAut");
//Creacion registor y confirmacion de usuarioo
router.post("/", usuariosController.crearUsuario); //crea un nuevo usuarios
router.post("/login", usuariosController.autenticar);
router.get("/confirmar/:token", usuariosController.confirmarToken);
router.post("/olvide-password", usuariosController.olvidePassword);
router.get("/olvide-password/:token", usuariosController.comprovarToken);
router.post("/olvide-password/:token", usuariosController.nuevoPassword);
router.get("/perfil", checkAut, usuariosController.perfil);
module.exports = router;
