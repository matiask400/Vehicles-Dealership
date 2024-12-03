// Este servicio (httpService) configura Axios (es una biblioteca) para manejar solicitudes HTTP en un entorno de frontend,
// incluyendo la adición automática de tokens de acceso a las solicitudes si están disponibles en sessionStorage.
// También intercepta y maneja respuestas, mostrando alertas modales para errores comunes como falta de autenticación o autorización.


import axios from "axios";
import modalService from "./modalDialog.service";


const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});


httpService.interceptors.request.use(
  (request) => {
    modalService.BloquearPantalla(true);
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }
    return request;
  },
  (error) => {
    console.log("error en axios request", error);
    return Promise.reject(error);
  }
);


httpService.interceptors.response.use(
  (response) => {
    modalService.BloquearPantalla(false);
    return response;
  },
  (error) => {
    // loguear el error
    console.log("error en axios response ", error);
    modalService.BloquearPantalla(false);


    if (error.response.status === 401) {
      // no auntenticado
      error.message = "Debe loguearse para acceder a esta funcionalidad";
    } else if (error.response.status === 403) {
      // no auntenticado
      error.message = "usuario no autorizado para acceder a esta funcionalidad";
    } else {
      error.message =
        error?.response?.data?.message ??
        "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
    }
    modalService.Alert(error.message);


    return Promise.reject(error);

  }
);


export default httpService;
