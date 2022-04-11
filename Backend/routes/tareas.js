const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareasController");
const checkAut = require("../middleware/checkAut");
router.get("/:id", checkAut, tareasController.getTareas);
router.put("/:id", checkAut, tareasController.UpadteTareas);
router.delete("/:id", checkAut, tareasController.DeleteTareas);
router.post("/", checkAut, tareasController.newTarea);
router.post("/estado/:id", checkAut, tareasController.UpadteEstado);

module.exports = router;
