const express = require("express");
const dotenv = require("dotenv");
const conectarBD = require("./config/db");
const usuarios = require("./routes/usuario");
const proyectos = require("./routes/proyectos");
const tareas = require("./routes/tareas");
const cors = require("cors");
const app = express();
dotenv.config();
conectarBD();
const whitelist = ["http://localhost:3000"];
const corsOption = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //puede consultar api
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Rutas del aplicativos
app.use("/api/usuarios", usuarios);
app.use("/api/proyectos", proyectos);
app.use("/api/tareas", tareas);

const servidor = app.listen(3001, () => {
  console.log(`Servidor iniciado en el puerto `);
});
///socket it

const { Server } = require("socket.io");
const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origing: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("conectado a socket io");
  //Evento para el proyecto
  socket.on("abrir proyecto", (proyecto) => {
    socket.join(proyecto);
  });

  socket.on("nueva tarea", (tarea) => {
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit("tarea agregada", tarea);
  });

  socket.on("eliminar tarea", (tarea) => {
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit("tarea eliminada", tarea);
  });

  socket.on("actualizar tarea", (tarea) => {
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit("tarea actualizada", tarea);
  });
  socket.on("cambiar estado", (tarea) => {
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit("nuevo estado", tarea);
  });
});
