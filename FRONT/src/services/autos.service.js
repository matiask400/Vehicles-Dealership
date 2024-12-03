import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlAutos;

async function Buscar(Pagina) {
  try {
    const resp = await httpService.get(urlResource, {
      params: { Pagina },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching autos:", error);
    throw error;
  }
}

export const autosService = {
  Buscar,
};
