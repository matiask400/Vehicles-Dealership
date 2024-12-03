const express = require("express");
const cors = require("cors");
require("./base-orm/sqlite-init");  // crear base si no existe
const marcasRouter = require("./routes/marcas");
const vehiculosRouter = require("./routes/autos");
const seguridadRouter = require("./routes/seguridad");
const paisesRouter = require("./routes/paises");
const tipovehiculo = require("./routes/tipovehiculo");


// Crear servidor
const app = express();

// Configuración específica de CORS para permitir solo desde http://localhost:5173
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200
};

// Habilita CORS con las opciones especificadas
app.use(cors(corsOptions));

// Controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});
app.use(express.json()); // Para poder leer json en el body
app.use(marcasRouter);
app.use(vehiculosRouter);
app.use(seguridadRouter);
app.use(paisesRouter);
app.use(tipovehiculo);

if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto http://localhost:${port}/`);
  });
}
module.exports = app; // para testing
