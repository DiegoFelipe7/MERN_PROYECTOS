const Tareas = require("../models/Tareas");
const Proyectos = require("../models/Proyectos");
exports.newTarea = async (req, res) => {
  const { proyecto } = req.body;
  const { usuario } = req;
  const existeProyecto = await Proyectos.findById(proyecto);
  if (!existeProyecto) {
    res.status(404).json({ msg: "Este proyecto no existe" });
  }
  if (existeProyecto.creador.toString() !== usuario._id.toString()) {
    res.status(404).json({ msg: "No tienen los permiso adecuados" });
  }

  try {
    const tarea = new Tareas({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      prioridad: req.body.prioridad,
      proyecto: req.body.proyecto,
    });
    await Tareas.create(tarea);
    existeProyecto.tareas.push(tarea._id);
    await existeProyecto.save();
    res.status(201).json(tarea);
  } catch (error) {
    res.status(401).json({ msg: "Ocurrio un error" });
  }
  /* const { proyecto } = req.body;
  const tarea = new Tareas({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    prioridad: req.body.prioridad,
    proyecto: req.body.proyecto,
  });
  tarea
    .save()
    .then((result) => {
      Proyectos.findById(proyecto).then(p);
    })
    .catch((err) => {});*/
};

exports.getTareas = (req, res) => {
  const { id } = req.params;
  const { usuario } = req;
  Tareas.findById(id)
    .populate("proyecto")
    .then((result) => {
      if (usuario._id.toString() === result.proyecto.creador.toString()) {
        res.status(200).json(result);
      } else {
        const erro = Error("Accion no permitida");
        res.status(403).json({ msg: erro.message });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.UpadteTareas = (req, res) => {
  const { usuario } = req;
  const { id } = req.params;
  Tareas.findById(id)
    .populate("proyecto")
    .then((result) => {
      if (result.proyecto.creador.toString() === usuario._id.toString()) {
        result.nombre = req.body.nombre || result.nombre;
        result.descripcion = req.body.descripcion || result.descripcion;
        result.prioridad = req.body.prioridad || result.prioridad;
        result.fechaEntrega = req.body.fechaEntrega || result.fechaEntrega;
        result
          .save()
          .then((updateResult) => {
            res.status(201).json(updateResult);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const erro = Error("Accion no permitida");
        res.status(403).json({ msg: erro.message });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.DeleteTareas = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tareas.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const proyecto = await Proyectos.findById(tarea.proyecto);
    proyecto.tareas.pull(tarea._id);
    await Promise.allSettled([await proyecto.save(), await tarea.deleteOne()]);
    res.json(tarea);
  } catch (error) {
    console.log(error);
  }
};
exports.UpadteEstado = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tareas.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (
    tarea.proyecto.creador.toString() !== req.usuario._id.toString() &&
    !tarea.proyecto.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error.message });
  }

  tarea.estado = !tarea.estado;
  tarea.completado = req.usuario._id;
  await tarea.save();

  const tareaAlmacenada = await Tareas.findById(id)
    .populate("proyecto")
    .populate("completado");

  res.json(tareaAlmacenada);
};
