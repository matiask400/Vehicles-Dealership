// Este servicio (AuthService) maneja la autenticación de usuarios en un frontend, interactuando con un backend a través de solicitudes HTTP.
// Utiliza sessionStorage para almacenar tokens de acceso y refresco, y proporciona funciones para iniciar sesión, cerrar sesión,
// obtener el usuario logueado y suscribirse a cambios en el estado de usuario logueado. Además, utiliza servicios externos como httpService para
// comunicarse con el backend y modalService para mostrar alertas al usuario.


import httpService from "./http.service";
import { config } from "../config";
import modalService from "./modalDialog.service";


const login = async (usuario, clave, navigateToComponent) => {
  let resp = await httpService.post(config.urlServidor + "/api/login", {
    usuario,
    clave,
  });


  if (resp.data?.accessToken) {
    sessionStorage.setItem("usuarioLogueado", usuario);
    sessionStorage.setItem("accessToken", resp.data.accessToken);
    sessionStorage.setItem("refreshToken", resp.data.refreshToken);
    if (CambioUsuarioLogueado) CambioUsuarioLogueado(usuario);
    {
      //navigate("/Inicio");
      navigateToComponent();
    }

  } else {
    if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
    //alert("Usuario o clave incorrectos");
    modalService.Alert("Usuario y/o clave incorrectos");
  }
};


const logout = () => {
  sessionStorage.removeItem("usuarioLogueado");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
};


const getUsuarioLogueado = () => {
  return sessionStorage.getItem("usuarioLogueado");
};


let CambioUsuarioLogueado = null;
const subscribeUsuarioLogueado = (x) => (CambioUsuarioLogueado = x);


const AuthService = {
  login,
  logout,
  getUsuarioLogueado,
  subscribeUsuarioLogueado
};


export default AuthService;
