import httpService from "./http.service";
import { config } from "../config";


const urlResource = config.urlTipoVehiculo;

async function Buscar() {
  try {
    const resp = await httpService.get(urlResource);
    return resp.data;
  } catch (error) {
    console.error("Error fetching TipoVehiculo:", error);
    throw error;
  }
}


export const tipoVehiculoService = {
  Buscar,
};
