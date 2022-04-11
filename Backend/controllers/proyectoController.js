const path = require("path");
const proyecto = require("../models/Proyectos");
const tareas = require("../models/Tareas");
const usuarios = require("../models/Usuarios");
exports.getProyectos = (req, res) => {
  const { usuario } = req;
  proyecto
    .find({
      $or: [{ colaboradores: { $in: usuario } }, { creador: { $in: usuario } }],
    })
    .select("-tareas")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json({ msg: "Ocurrio un error al listar los proyectos" });
    });
};

exports.newProyect = (req, res) => {
  const { usuario } = req;
  const proyectos = new proyecto({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    cliente: req.body.cliente,
    creador: usuario._id,
  });
  proyectos
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

exports.obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  const { usuario } = req;
  const proyectos = await proyecto
    .findById(id)
    .populate({
      path: "tareas",
      populate: { path: "completado", select: "nombre" },
    })
    .populate("colaboradores", "nombre email");
  if (!proyectos) {
    res.status(404).json({ msg: "Proyecto no encontrado" });
  }
  if (
    proyectos.creador.toString() !== usuario._id.toString() &&
    !proyectos.colaboradores.some(
      (colaborador) => colaborador._id.toString() === usuario._id.toString()
    )
  ) {
    res.status(401).json({ msg: "opcion inavalida xd" });
  } else {
    res.status(200).json(proyectos);
  }
};

exports.uptadeProyecto = (req, res) => {
  const { id } = req.params;
  const { usuario } = req;
  proyecto
    .findById(id)
    .then((proyectResult) => {
      if (proyectResult.creador.toString() === usuario._id.toString()) {
        proyectResult.nombre = req.body.nombre || proyectResult.nombre;
        proyectResult.descripcion =
          req.body.descripcion || proyectResult.descripcion;
        proyectResult.fechaEntrega =
          req.body.fechaEntrega || proyectResult.fechaEntrega;
        proyectResult.cliente = req.body.cliente || proyectResult.cliente;

        proyectResult
          .save()
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProyecto = (req, res) => {
  const { id } = req.params;
  const { usuario } = req;
  proyecto
    .findById(id)
    .then((proyectResult) => {
      if (proyectResult.creador.toString() === usuario._id.toString()) {
        proyectResult
          .deleteOne({ _id: id })
          .then((result) => {
            res.status(200).json({ msg: "Datos eliminados" });
          })
          .catch((err) => {
            res.status(404).json({ msg: "Ocurrio un error" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.newColaborador = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;
  const proyectos = await proyecto.findById(id);

  if (!proyectos) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyectos.creador.toString() !== usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;
  const usu = await usuarios
    .findOne({ email })
    .select("-password -confirmado -token -createdAt -updatedAt -__v");

  if (!usu) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // El colaborador no es el admin del proyecto
  if (proyectos.creador.toString() === usu._id.toString()) {
    const error = new Error("El Creador del Proyecto no puede ser colaborador");
    return res.status(404).json({ msg: error.message });
  }

  if (proyectos.colaboradores.includes(usu._id)) {
    return res.status(404).json({ msg: "Este usuario ya esta en el proyecto" });
  }
  //esta bien
  try {
    proyectos.colaboradores.push(usu._id);
    await proyectos.save();
    res.status(201).json({ msg: "Usuario agregado al proyecto" });
  } catch (error) {}
};

exports.getColaboradores = async (req, res) => {
  const { email } = req.body;
  const usu = await usuarios
    .findOne({ email })
    .select("-password -confirmado -token -createdAt -updatedAt -__v");
  if (!usu) {
    res.status(404).json({ msg: "Usuario no existe" });
  }
  res.status(201).json(usu);
};

exports.deleteColaborador = async (req, res) => {
  const { id } = req.params;
  const proyectos = await proyecto.findById(id);
  if (!proyectos) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyectos.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  // Esta bien, se puede eliminar
  proyectos.colaboradores.pull(req.body.id);
  await proyectos.save();
  res.json({ msg: "Colaborador Eliminado Correctamente" });
};

exports.getTareasProyecto = (req, res) => {
  const { id } = req.params;
  const { usuario } = req;
  proyecto
    .findById(id)
    .then((result) => {
      if (result) {
        const erro = Error("Datos no encontrados");
        res.status(403).json({ msg: erro.message });
      } else {
        if (result.creador.toString() === usuario._id.toString()) {
          tareas
            .find()
            .where("proyecto")
            .equals(id)
            .then((resultTareas) => {
              res.status(201).json(resultTareas);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const erro = Error("Accion no permitida");
          res.status(403).json({ msg: erro.message });
        }
      }
    })
    .catch((err) => {
      console.log(error);
    });
};
