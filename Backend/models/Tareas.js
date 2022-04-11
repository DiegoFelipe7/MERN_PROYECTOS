const mongoose = require("mongoose");
const SchemaTarea = mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    descripcion: {
      type: String,
      require: true,
      trim: true,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    fechaEntrega: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    prioridad: {
      type: String,
      require: true,
      enum: ["Baja", "Media", "Alta"],
    },
    proyecto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "proyectos",
    },
    completado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("tareas", SchemaTarea);
