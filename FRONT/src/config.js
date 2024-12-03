//Manejamos las URL de acceso a las APIs del servidor

const urlServidor = "http://localhost:3000"

const urlAutos = urlServidor + "/api/autos";
const urlMarcas = urlServidor + "/api/marcas";
const urlAutosJWT = urlServidor + "/api/autosJWT";
const urlPaises = urlServidor + "/api/paises";
const urlTipoVehiculo = urlServidor + "/api/tipovehiculo";

export const config = {
    urlServidor,
    urlAutos,
    urlMarcas,
    urlPaises,
    urlAutosJWT,
    urlTipoVehiculo,
}

