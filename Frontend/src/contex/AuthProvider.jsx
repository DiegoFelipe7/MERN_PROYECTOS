import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteaxios from "../config/axios";
const AuthContex = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setauth] = useState({});
  const [cargando, setcargando] = useState(true);
  const navegacion = useNavigate();
  useEffect(() => {
    const autenticarToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setcargando(false);
        return;
      }
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const respuesta = await clienteaxios.get("usuarios/perfil", config);
        setauth(respuesta.data);
        navegacion("/proyectos");
      } catch (error) {}
      setcargando(false);
    };
    autenticarToken();
  }, []);
  const cerrarSesion = () => {
    setauth({});
    localStorage.removeItem("token");
  };
  return (
    <AuthContex.Provider value={{ auth, cargando, setauth, cerrarSesion }}>
      {children}
    </AuthContex.Provider>
  );
};

export { AuthProvider };
export default AuthContex;
