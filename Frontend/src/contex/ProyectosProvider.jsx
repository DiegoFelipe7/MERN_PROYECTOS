import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteaxios from "../config/axios";
import io from "socket.io-client";
import useAuth from "../hook/useAuth";
let socket;
const ProyectoContex = createContext();
const ProyectosProvider = ({ children }) => {
  const [proyectos, setproyectos] = useState([]);
  const [proyecto, setproyecto] = useState({});
  const [alerta, setalerta] = useState([]);
  const [modal, setmodal] = useState(false);
  const [modalEliminar, setmodalEliminar] = useState(false);
  const [cargando, setcargando] = useState(false);
  const [tarea, setarea] = useState({});
  const [colaborador, setcolaborador] = useState({});
  const [eliminarcolaborador, seteliminarcolaborador] = useState(false);
  const [modalbuscador, setmodalbuscador] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    const cargarProyectos = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const respuesta = await clienteaxios.get("proyectos", config);
        setproyectos(respuesta.data);
      } catch (error) {}
    };
    cargarProyectos();
  }, [auth]);
  useEffect(() => {
    socket = io("http://localhost:3001");
  }, []);

  const submitProyecto = async (proyecto) => {
    if (proyecto._id) {
      await actualizarProyectos(proyecto);
    } else {
      await guardarProyectos(proyecto);
    }
  };

  const guardarProyectos = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      console.log("hay token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.post("proyectos", proyecto, config);
      setproyectos([...proyectos, respuesta.data]);

      setalerta({
        msg: "Proyecto Creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setalerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {}
  };
  const mostrarAlerta = (alerta) => {
    setalerta(alerta);
    setTimeout(() => {
      setalerta({});
    }, 3000);
  };
  const actualizarProyectos = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      console.log("hay token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.put(
        `proyectos/${proyecto._id}`,
        proyecto,
        config
      );
      //sincronizar el state
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === respuesta.data._id
          ? respuesta.data
          : proyectoState
      );
      setproyectos(proyectosActualizados);

      setalerta({
        msg: "Datos Actualizados Correctamente",
        error: false,
      });
      setproyecto({});
      setTimeout(() => {
        setalerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {}
  };
  const obtenerProyecto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      console.log("hay token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.get(`proyectos/${id} `, config);
      setproyecto(respuesta.data);
      setalerta({});
    } catch (error) {
      setTimeout(() => {
        setalerta({});
      }, 5000);
    } finally {
      setcargando(false);
    }
  };

  const eliminarProyecto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      console.log("hay token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.delete(`proyectos/${id}`, config);
      const proyectoEliminado = proyectos.filter(
        (proyecto) => proyecto._id !== id
      );
      setproyectos(proyectoEliminado);
      setproyecto({});
      setalerta({
        msg: respuesta.data.msg,
        error: false,
      });
      setTimeout(() => {
        setalerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setalerta({});
        navigate("/proyectos");
      }, 3000);
    }
  };
  const handleModalTarea = () => {
    setmodal(!modal);
    setarea({});
  };

  const handleModalEliminar = () => {
    setmodalEliminar(!modalEliminar);
    setarea({});
  };

  const submitTarea = async (tarea) => {
    if (tarea._id) {
      await actualizarTarea(tarea);
    } else {
      await guardarTarea(tarea);
    }
  };
  const guardarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.post("tareas", tarea, config);
      //agrega la tarea al state

      setalerta({
        msg: "Tarea Creada Correctamente",
        error: false,
      });
      setmodal(false);
      socket.emit("nueva tarea", respuesta.data);
      setTimeout(() => {
        setalerta({});
      }, 3000);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setalerta({});
      }, 3000);
    }
  };
  const actualizarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.put(
        `tareas/${tarea._id}`,
        tarea,
        config
      );

      socket.emit("actualizar tarea", respuesta.data);

      setalerta({
        msg: "Datos modificados correctamente",
        error: false,
      });
      setTimeout(() => {
        setalerta({});
        setmodal(false);
      }, 2000);
    } catch (error) {}
  };
  const handleModalEditarTarea = (tarea) => {
    setarea(tarea);
    setmodal(true);
  };
  const handleModalEliminarTarea = (tarea) => {
    setarea(tarea);
    setmodalEliminar(true);
  };
  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.delete(
        `tareas/${tarea._id}`,
        config
      );
      socket.emit("eliminar tarea", tarea);
      setalerta({
        msg: "Dato eliminado correctamente",
        error: false,
      });
      setTimeout(() => {
        setalerta({});
        setmodalEliminar(false);
        setarea({});
      }, 2000);
    } catch (error) {}
  };
  const submitColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.post(
        "proyectos/colaboradores",
        { email },
        config
      );
      setcolaborador(respuesta.data);
      setalerta({
        msg: "Usuario existe ",
        error: false,
      });
      setTimeout(() => {
        setalerta({});
      }, 2000);
    } catch (error) {}
  };
  const guardarColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.post(
        `proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );
      setalerta({
        msg: respuesta.data.msg,
        error: false,
      });
      setTimeout(() => {
        setalerta({});
        setcolaborador({});
      }, 2000);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setalerta({});
        setcolaborador({});
      }, 2000);
    }
  };
  const handleEliminarColaborador = (colaborador) => {
    seteliminarcolaborador(!eliminarcolaborador);
    setcolaborador(colaborador);
  };
  const eliminarColaboradorProyecto = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.post(
        `proyectos/eliminar-colabora/${proyecto._id}`,
        { id: colaborador._id },
        config
      );

      const proyectoeliminar = { ...proyecto };
      proyectoeliminar.colaboradores = proyectoeliminar.colaboradores.filter(
        (colabora) => colabora._id !== colaborador._id
      );
      setproyecto(proyectoeliminar);
      setalerta({
        msg: respuesta.data.msg,
        error: false,
      });

      setTimeout(() => {
        setalerta({});
        setcolaborador({});
        seteliminarcolaborador(false);
      }, 2000);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setalerta({});
        setcolaborador({});
        seteliminarcolaborador(false);
      }, 2000);
    }
  };
  const completarTarea = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteaxios.post(
        `tareas/estado/${id}`,
        {},
        config
      );
      socket.emit("cambiar estado", respuesta.data);
    } catch (error) {}
  };
  const handleBuscador = () => {
    setmodalbuscador(!modalbuscador);
  };
  //socket ir para las funciones
  const submitTareasProyectos = (tareanueva) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareanueva];
    setproyecto(proyectoActualizado);
  };
  const submitEliminarTarea = (tarea) => {
    console.log("entro esa monda");
    const eliminado = { ...proyecto };
    eliminado.tareas = eliminado.tareas.filter(
      (tareas) => tareas._id !== tarea._id
    );
    setproyecto(eliminado);
  };

  const submitActualizarTare = (tareaId) => {
    const proyectoActualizado = { ...proyecto };
    (proyectoActualizado.tareas = proyectoActualizado.tareas.map((tarea) =>
      tarea._id === tareaId._id ? tareaId : tarea
    )),
      setproyecto(proyectoActualizado);
  };
  const cambiarEstadoTarea = (tareaId) => {
    const proyectoActualizado = { ...proyecto };
    (proyectoActualizado.tareas = proyectoActualizado.tareas.map((tarea) =>
      tarea._id === tareaId._id ? tareaId : tarea
    )),
      setproyecto(proyectoActualizado);
  };
  const cerrarSesionProyecto = () => {
    setarea({});
    setproyecto({});
    setproyectos([]);
    setcolaborador({});
  };
  return (
    <ProyectoContex.Provider
      value={{
        proyectos,
        alerta,
        proyecto,
        cargando,
        modal,
        tarea,
        modalEliminar,
        colaborador,
        eliminarcolaborador,
        modalbuscador,
        handleModalTarea,
        submitProyecto,
        mostrarAlerta,
        obtenerProyecto,
        eliminarProyecto,
        submitTarea,
        handleModalEditarTarea,
        handleModalEliminar,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        guardarColaborador,
        handleEliminarColaborador,
        eliminarColaboradorProyecto,
        completarTarea,
        handleBuscador,
        submitTareasProyectos,
        submitEliminarTarea,
        submitActualizarTare,
        cambiarEstadoTarea,
        cerrarSesionProyecto,
      }}
    >
      {children}
    </ProyectoContex.Provider>
  );
};
export { ProyectosProvider };
export default ProyectoContex;
