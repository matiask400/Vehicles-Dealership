const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Rutas de acceso a la tabla TipoVehiculo
router.get("/api/tipovehiculo", async function (req, res, next) {
  try {
    let items = await db.TipoVehiculo.findAll({
      attributes: [
        "IdTipoVehiculo",
        "Nombre",
      ],
    });
    res.json(items);
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
});

module.exports = router;
