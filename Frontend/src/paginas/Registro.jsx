import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../Components/Alerta";
import clienteaxios from "../config/axios";
const Registro = () => {
  const [registo, setregisto] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const [alerta, setalerta] = useState({});
  const { nombre, email, password, confirmar } = registo;

  const RegistroUser = async (e) => {
    e.preventDefault();
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      console.log("ente");
      setalerta({
        msg: "Todos los campos sob obligatorios",
        error: true,
      });
      return;
    }
    if (password !== confirmar) {
      setalerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setalerta({
        msg: "El password es muy corto minimo 6 caracteres",
        error: true,
      });
      return;
    }
    setalerta({});
    //Realizando la peticion al back
    try {
      const respuesta = await clienteaxios.post("usuarios", registo);
      setalerta({
        msg: respuesta.data.msg,
        error: false,
      });
      setTimeout(() => {
        setalerta({});
      }, 3000);
      setregisto({
        nombre: "",
        email: "",
        password: "",
        confirmar: "",
      });
    } catch (erro) {
      setalerta({
        msg: erro.response.data,
        error: true,
      });
      setTimeout(() => {
        setalerta({});
      }, 3000);
    }
  };
  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="my-5 bg-white shadow rounded px-10 py-5"
        onSubmit={RegistroUser}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            name="nombre"
            placeholder="Nombre Del Registo"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={(e) =>
              setregisto({ ...registo, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email De Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={(e) =>
              setregisto({ ...registo, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            value={password}
            type="password"
            placeholder="Password De Registo"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={(e) =>
              setregisto({ ...registo, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="confirmar"
          >
            Repetir password
          </label>
          <input
            id="cofirmar"
            name="confirmar"
            value={confirmar}
            type="password"
            placeholder="Confirmar Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={(e) =>
              setregisto({ ...registo, [e.target.name]: e.target.value })
            }
          />
        </div>
        <input
          type="submit"
          value="CREAR CUENTA"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿YA tienes una cuenta? INICIA SESIÓN
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Registro;
