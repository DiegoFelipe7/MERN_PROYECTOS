import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteaxios from "../config/axios";
import Alerta from "../Components/Alerta";
const ConfirmarCuenta = () => {
  const [alerta, setalerta] = useState({});
  const [cuenta, setcuenta] = useState(false);
  const paramas = useParams();
  const { token } = paramas;
  useEffect(() => {
    const validarToken = async () => {
      try {
        const respueta = await clienteaxios.get(`usuarios/confirmar/${token}`);
        setalerta({
          msg: respueta.data.msg,
          error: false,
        });

        setcuenta(true);
      } catch (erro) {
        setalerta({
          msg: erro.response.data.msg,
          error: true,
        });
      }
    };
    validarToken();
  }, []);
  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {msg && <Alerta alerta={alerta} />}
        {cuenta && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            INICIA SESIÓN
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
