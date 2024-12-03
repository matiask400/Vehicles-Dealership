const request = require("supertest");
const app = require("../index");

describe("GET /api/paises", function () {
  it("Devolveria todos los paises", async function () {
    const res = await request(app)
      .get("/api/paises")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdPais: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});