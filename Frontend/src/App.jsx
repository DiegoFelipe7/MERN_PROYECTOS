import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevaPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import { AuthProvider } from "./contex/AuthProvider";
import { ProyectosProvider } from "./contex/ProyectosProvider";
import RutasProtegidas from "./Layouts/RutasProtegidas";
import Proyectos from "./paginas/Proyectos";
import NuevoProyecto from "./paginas/NuevoProyecto";
import Proyecto from "./paginas/Proyecto";
import EditarProyecto from "./paginas/EditarProyecto";
import NuevoColaborador from "./paginas/NuevoColaborador";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ProyectosProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="registrar" element={<Registro />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route
                  path="olvide-password/:token"
                  element={<NuevoPassword />}
                />
                <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
              </Route>

              <Route path="/proyectos" element={<RutasProtegidas />}>
                <Route index element={<Proyectos />} />
                <Route path="crear-proyecto" element={<NuevoProyecto />} />
                <Route path=":id" element={<Proyecto />} />
                <Route path="editar/:id" element={<EditarProyecto />} />
                <Route
                  path="nuevo-colaborador/:id"
                  element={<NuevoColaborador />}
                />
              </Route>
            </Routes>
          </ProyectosProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
