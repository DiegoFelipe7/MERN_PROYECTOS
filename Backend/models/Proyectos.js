const mongoose = require("mongoose");
const schemaProyectos = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      require: true,
    },
    descripcion: {
      type: String,
      trim: true,
      require: true,
    },
    fechaEntrega: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      trim: true,
      require: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario",
    },
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: "tareas" }],
    colaboradores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("proyectos", schemaProyectos);
