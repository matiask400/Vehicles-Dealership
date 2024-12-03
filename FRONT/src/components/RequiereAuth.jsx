import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";


function RequireAuth({ children }) {
  let usuarioLogueado = AuthService.getUsuarioLogueado();
  if (!usuarioLogueado) {
    return <Navigate to={"/login/" + children.type.name} />;
  }
  return children;
}


export { RequireAuth };