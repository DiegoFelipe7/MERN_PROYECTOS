const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schemaUsuario = mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
//metodo para hacer una contraseña
schemaUsuario.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//metodo para validar una contraseña
schemaUsuario.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password); //esta funcion retorna tru o false
};
module.exports = mongoose.model("usuario", schemaUsuario);
