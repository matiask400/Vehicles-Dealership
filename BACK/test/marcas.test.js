const request = require("supertest");
const app = require("../index");

describe("GET /api/marcas", function () {
  it("Devolveria todos los marcas", async function () {
    const res = await request(app)
      .get("/api/marcas")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdMarca: expect.any(Number),
          Nombre: expect.any(String),
          Slogan: expect.any(String),
          Sede: expect.any(Number),
        }),
      ])
    );
  });
});