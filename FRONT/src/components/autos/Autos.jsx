import React, { useState, useEffect } from "react";
import { autosService } from "../../services/autos.service";
import { marcasService } from "../../services/marcas.service";
import moment from "moment";

function Autos() {
  const tituloPagina = "Autos";
  const [autos, setAutos] = useState([]); // Inicializa un array vacio
  const [Pagina, setPagina] = useState(1); // Inicializa en 1
  const [Paginas, setPaginas] = useState([]); // Inicializa un array vacio
  const [RegistrosTotal, setRegistrosTotal] = useState(0); // Inicializa en 0
  const [Marcas, setMarcas] = useState([]); // Inicializa un array vacio

  useEffect(() => {
    Buscar(1); // Busca la primera página
    async function BuscarMarca() {
      let data = await marcasService.Buscar();
      setMarcas(data);
    }
    BuscarMarca();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }

    setAutos([]); // Limpia la tabla
    try {
      const data = await autosService.Buscar(_pagina);
      setAutos(data.Items);
      setRegistrosTotal(data.RegistrosTotal);

      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    } catch (error) {
      console.log("Error al buscar datos en el servidor!", error);
    }
  }

  function handlePageChange(e) {
    const selectedPage = Number(e.target.value);
    Buscar(selectedPage);
  }

  function Imprimir() {
    console.log("Print button clicked");
  }

  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Nombre</th>

            <th style={{ width: "20%" }}>Marca</th>
            <th style={{ width: "20%" }}>Precio</th>
            <th style={{ width: "20%" }}>Stock</th>
            <th style={{ width: "20%" }}>Fecha de Alta</th>
          </tr>
        </thead>
        <tbody>
          {autos.length > 0 ? (
            autos.map((auto) => (
              <tr key={auto.Nombre}>
                <td>{auto.Nombre}</td>
                <td className="text-center">{Marcas.find((x) => x.IdMarca === auto.IdMarca)?.Nombre}</td>
                <td className="text-center">{auto.Precio}</td>
                <td className="text-center">{auto.Stock}</td>
                <td className="text-center">{moment(auto.FechaAlta).format("DD/MM/YYYY")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select value={Pagina} onChange={handlePageChange}>
              {Paginas.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas.length}
          </div>
          <div className="col">
            <button className="btn btn-primary float-end" onClick={Imprimir}>
              <i className="fa fa-print"></i> Imprimir
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { Autos };
