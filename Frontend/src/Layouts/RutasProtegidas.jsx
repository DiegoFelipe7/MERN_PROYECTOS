import { Outlet, Navigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import useAuth from "../hook/useAuth";
const RutasProtegidas = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return "cargando...";
  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="flex-1 p-10">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <>
          {setTimeout(() => {
            <Navigate to={"/"} />;
          }, 5000)}
        </>
      )}
    </>
  );
};

export default RutasProtegidas;
