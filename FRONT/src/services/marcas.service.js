import httpService from "./http.service";
import { config } from "../config";

const urlResource = config.urlMarcas;

async function Buscar() {
  try {
    const resp = await httpService.get(urlResource);
    return resp.data;
  } catch (error) {
    console.error("Error fetching marcas:", error);
    throw error;
  }
}

export const marcasService = {
  Buscar,
};
