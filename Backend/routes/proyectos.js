const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const checkAut = require("../middleware/checkAut");
router.get("/", checkAut, proyectoController.getProyectos);
router.post("/", checkAut, proyectoController.newProyect);
router.get("/:id", checkAut, proyectoController.obtenerProyecto);
router.put("/:id", checkAut, proyectoController.uptadeProyecto);
router.delete("/:id", checkAut, proyectoController.deleteProyecto);

router.get("/tareas/:id", checkAut, proyectoController.getTareasProyecto);
router.post(
  "/agregar-colaborador/:id",
  checkAut,
  proyectoController.newColaborador
);
router.post("/colaboradores", checkAut, proyectoController.getColaboradores);
router.post("/colaboradores/:id", checkAut, proyectoController.newColaborador);
router.post(
  "/eliminar-colabora/:id",
  checkAut,
  proyectoController.deleteColaborador
);

module.exports = router;
