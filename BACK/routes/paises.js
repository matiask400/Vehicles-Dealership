const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Rutas de acceso a la tabla Paises
router.get("/api/paises", async function (req, res, next) {
  try {
    let items = await db.Paises.findAll({
      attributes: [
        "IdPais",
        "Nombre",
      ],
    });
    res.json(items);
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
});

module.exports = router;