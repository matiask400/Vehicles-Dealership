const request = require('supertest');
const app = require('../index');  // Asegúrate de que esta ruta apunte a tu archivo principal de la app
const jwt = require('jsonwebtoken');

const usuarioMiembro = {
  username: "admin",
  password: "123",
};

async function obtenerToken() {
  const token = jwt.sign({ username: usuarioMiembro.username }, accessTokenSecret="youraccesstokensecret", { expiresIn: '1h' });
  return token;
}

let token;

beforeAll(async () => {
  token = await obtenerToken();
});

describe("GET /api/autosJWT", () => {
  it("Devolvería todos los autos, solo autorizado para administradores", async () => {
    const res = await request(app)
      .get("/api/autosJWT")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdAuto: expect.any(Number),
            Nombre: expect.any(String),
            IdTipoVehiculo: expect.any(Number),
            Precio: expect.any(Number),
            IdMarca: expect.any(Number),
            Stock: expect.any(Number),
            FechaAlta: expect.any(String),
            Activo: expect.any(Boolean),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

describe("GET /api/autosJWT/:id", () => {
  it("Debería devolver el artículo con el id 1", async () => {
    const res = await request(app)
      .get("/api/autosJWT/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdAuto: expect.any(Number),
        Nombre: expect.any(String),
        IdTipoVehiculo: expect.any(Number),
        Precio: expect.any(Number),
        IdMarca: expect.any(Number),
        Stock: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

describe("POST /api/autosJWT", () => {
  it("Debería devolver el artículo que acabo de crear", async () => {
    const autoloAlta = {
      Nombre: "Auto " + (() => (Math.random() + 1).toString(36).substring(2))(),
      IdTipoVehiculo: 1,
      Precio: 10.5,
      IdMarca: 1,
      Stock: 11,
      FechaAlta: new Date().toISOString(),
      Activo: true,
    };

    const res = await request(app)
      .post("/api/autosJWT")
      .set("Authorization", `Bearer ${token}`)
      .send(autoloAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        IdTipoVehiculo: expect.any(Number),
        Precio: expect.any(Number),
        IdMarca: expect.any(Number),
        Stock: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

describe("PUT /api/autosJWT/:id", () => {
  it("Debería devolver el artículo con el id 1 modificado", async () => {
    const autoModificacion = {
      IdAuto: 1,
      Nombre: "Auto " + (() => (Math.random() + 1).toString(36).substring(2))(),
      IdTipoVehiculo: 1,
      Precio: 1000.5,
      IdMarca: 1,
      Stock: 10,
      FechaAlta: new Date().toISOString(),
      Activo: true,
    };

    const res = await request(app)
      .put("/api/autosJWT/1")
      .set("Authorization", `Bearer ${token}`)
      .send(autoModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

describe("DELETE /api/autosJWT/:id", () => {
  it("Debería devolver el artículo con el id 1 borrado", async () => {
    const res = await request(app)
      .delete("/api/autosJWT/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /api/autosJWT › Si", () => {
  it("usuario no autorizado", async () => {
    const res = await request(app)
      .get("/api/autosJWT")
      .set("Authorization", `Bearer invalidToken`);
    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual('Token no es valido');
  });
});
