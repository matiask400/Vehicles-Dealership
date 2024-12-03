import { config } from "../config";
import httpService from "./http.service";


const urlResource = config.urlAutosJWT;


async function Buscar(Nombre, Activo, Pagina, sortKey = "Nombre", sortDirection = "asc") {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina, sortKey, sortDirection },
  });
  return resp.data;
}


async function BuscarPorId(autos) {
  const resp = await httpService.get(urlResource + "/" + autos.IdAuto);
  return resp.data;
}


async function ActivarDesactivar(autos) {
  await httpService.delete(urlResource + "/" + autos.IdAuto);
}


async function Grabar(autos) {
  if (autos.IdAuto === 0) {
    await httpService.post(urlResource, autos);
  } else {
    await httpService.put(urlResource + "/" + autos.IdAuto, autos);
  }
}

export const autosService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
