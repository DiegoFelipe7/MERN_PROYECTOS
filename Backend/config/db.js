const mongoose = require("mongoose");
const conectarBD = async () => {
  try {
    const conexion = await mongoose.connect(process.env.MONGOO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conexion exitosa");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = conectarBD;
