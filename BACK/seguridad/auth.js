// Este código define un middleware para autenticar solicitudes HTTP mediante tokens JWT. 
// El middleware verifica si el encabezado de autorización está presente y contiene un token válido. 
// Si el token es válido, la solicitud continúa su procesamiento normal, y la información del usuario se almacena en res.locals.user. 
// Si el token es inválido o no está presente, se responde con un error 403 o 401 respectivamente.


const jwt = require("jsonwebtoken");

const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token no es valido" });
      }

      res.locals.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Acceso denegado" });
  }
};

module.exports = { authenticateJWT, accessTokenSecret, refreshTokenSecret };
