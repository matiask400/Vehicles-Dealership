const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Rutas de acceso a la tabla Marcas
router.get("/api/marcas", async function (req, res, next) {
  try {
    let items = await db.Marcas.findAll({
      attributes: [
        "IdMarca",
        "Nombre",
        "Slogan",
        "Sede"
      ]
    });
    res.json(items);
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
});

module.exports = router;
