//Importamos las rutinas de acceso a las tablas de la base de datos


import { Autos } from "./components/autos/Autos";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { Marcas } from "./components/marcas/Marcas";
import { ModalDialog } from "./components/ModalDialog";
import { AutosJWT } from "./components/autosJWT/AutosJWT";
import { RequireAuth } from "./components/RequiereAuth";
import { Login } from "./components/login/Login";

//Creamos la función App que es la que se encarga de manejar las rutas de la aplicación

function App() {
  return (
    <>
      <BrowserRouter>

        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/autos" element={<Autos />} />
            <Route path="/autosJWT" element={
              <RequireAuth>
                <AutosJWT />
              </RequireAuth>
            }
            />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
