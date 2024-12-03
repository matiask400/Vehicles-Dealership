// Este código implementa un sistema de autenticación utilizando tokens JWT en un servidor Express.js.
// Permite a los usuarios iniciar sesión, cerrar sesión (revocar tokens) y renovar tokens de acceso mediante tokens de actualización (refresh tokens),
// todo gestionado a través de rutas RESTful definidas en el enrutador.


const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../seguridad/auth");
const db = require("../base-orm/sequelize-init");

let refreshTokens = [];

// Middleware para cargar los usuarios
const loadUsers = async (req, res, next) => {
  try {
    res.locals.users = await db.Usuarios.findAll({
      attributes: ["IdUsuario", "Nombre", "Clave"],
    });
    next();
  } catch (error) {
    res.status(500).json({ message: "Error loading users" });
  }
};

router.post("/api/login", loadUsers, (req, res) => {

  const { usuario, clave } = req.body;
  const users = res.locals.users;
  const user = users.find((u) => u.Nombre === usuario && u.Clave === clave);

  if (user) {
    const accessToken = jwt.sign(
      { usuario: user.Nombre, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "1440m" }
    );

    const refreshToken = jwt.sign(
      { usuario: user.Nombre, rol: user.rol },
      auth.refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      message: "Bienvenido " + user.Nombre + "!",
    });
  } else {
    res.status(401).json({ message: "Usuario o clave incorrecto" });
  }
});


router.post("/api/logout", (req, res) => {

  const { token } = req.body;

  if (!token || !refreshTokens.includes(token)) {
    return res.status(401).json({ message: "Logout inválido!" });
  }

  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.json({ message: "Usuario deslogueado correctamente!" });
});


router.post("/api/token", (req, res) => {

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token es requerido" });//401 = no autorizado
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Refresh token no es valido" });// 403 = prohibido
  }

  jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Refresh token no es valido" });
    }

    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "1440m" }
    );

    res.json({ accessToken });
  });
});


module.exports = router;
