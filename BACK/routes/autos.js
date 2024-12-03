// Definicion de rutas para la tabla Autos
// Aqui se definen las rutas para acceder a las apis de la tabla Autos:
// GET /api/autosJWT
// GET /api/autosJWT/:id
// POST /api/autosJWT
// PUT /api/autosJWT/:id
// DELETE /api/autosJWT/:id
// GET /api/autos

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

// Rutas de acceso a la tabla Autos
router.get("/api/autosJWT", auth.authenticateJWT, async function (req, res, next) {
  try {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
      where.Activo = req.query.Activo === "true";
    }

    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const sortKey = req.query.sortKey || "Nombre"; // Establece una clave de ordenamiento para clasificar los datos
    const sortDirection = req.query.sortDirection === "desc" ? "DESC" : "ASC"; // Establece la dirección de ordenamiento

    const { count, rows } = await db.Autos.findAndCountAll({
      attributes: [
        "IdAuto",
        "Nombre",
        "IdTipoVehiculo",
        "Precio",
        "IdMarca",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      order: [[sortKey, sortDirection]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
});

router.get("/api/autosJWT/:id", auth.authenticateJWT, async function (req, res, next) {
  try {
    let items = await db.Autos.findOne({
      attributes: [
        "IdAuto",
        "Nombre",
        "IdTipoVehiculo",
        "Precio",
        "IdMarca",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      where: { IdAuto: req.params.id },
    });
    if (!items) {
      res.status(404).json({ message: "Auto no encontrado" });
    } else {
      res.json(items);
    }
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
});

router.post("/api/autosJWT", auth.authenticateJWT, async function (req, res, next) {
  try {
    let data = await db.Autos.create({
      Nombre: req.body.Nombre,
      IdTipoVehiculo: req.body.IdTipoVehiculo,
      Precio: req.body.Precio,
      IdMarca: req.body.IdMarca,
      Stock: req.body.Stock,
      FechaAlta: req.body.FechaAlta,
      Activo: req.body.Activo,
    });
    res.status(200).json(data.dataValues); // Devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // Si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      next(err); // Pasa el error al middleware de manejo de errores
    }
  }
});

router.put("/api/autosJWT/:id", auth.authenticateJWT, async function (req, res, next) {
  try {
    let item = await db.Autos.findOne({
      attributes: [
        "IdAuto",
        "Nombre",
        "IdTipoVehiculo",
        "Precio",
        "IdMarca",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      where: { IdAuto: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Auto no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Precio = req.body.Precio;
    item.IdMarca = req.body.IdMarca;
    item.Stock = req.body.Stock;
    item.FechaAlta = req.body.FechaAlta;
    item.Activo = req.body.Activo;
    await item.save();

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // Si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      next(err); // Pasa el error al middleware de manejo de errores
    }
  }
});

router.delete("/api/autosJWT/:id", auth.authenticateJWT, async function (req, res, next) {
  let bajaFisica = false; // Cambiar a true si se desea hacer una baja física

  try {
    if (bajaFisica) {
      // Baja física (borrado real)
      let filasBorradas = await db.Autos.destroy({
        where: { IdAuto: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // Baja lógica (borrado pero no físico)
      let data = await db.sequelize.query(
        "UPDATE Autos SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdAuto = :IdAuto",
        {
          replacements: { IdAuto: +req.params.id },
        }
      );
      res.sendStatus(200);
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      // Si son errores de validación, los devolvemos
      const messages = err.errors.map((x) => x.message);
      res.status(400).json(messages);
    } else {
      next(err); // Pasa el error al middleware de manejo de errores
    }
  }
});

//------------------------------------
//-- SIN SEGURIDAD ---------------------------
//------------------------------------
router.get("/api/autos", async function (req, res, next) {
  try {
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.Autos.findAndCountAll({
      attributes: [
        "Nombre",
        "Precio",
        "IdMarca",
        "Stock",
        "FechaAlta",
      ],
      order: [["Nombre", "ASC"]],
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });
    return res.json({ Items: rows, RegistrosTotal: count });
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
});

module.exports = router;

