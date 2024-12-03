import React, { useState } from "react";
import moment from "moment";

export default function AutosListado({
  Autos,
  Paises,
  Marcas,
  TipoVehiculo,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  const [sortConfig, setSortConfig] = useState({ key: "Nombre", direction: "asc" });

  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    Buscar(Pagina, key, direction);
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center" style={{ width: "16.1%" }} onClick={() => onSort('Nombre')}>Nombre</th>
            <th className="text-center" style={{ width: "11.1%" }} onClick={() => onSort('IdTipoVehiculo')}>Tipo</th>
            <th className="text-center" style={{ width: "11.1%" }} onClick={() => onSort('IdMarca')}>Marca</th>
            <th className="text-center" style={{ width: "11.1%" }} >Sede</th>
            <th className="text-center" style={{ width: "11.1%" }} onClick={() => onSort('Precio')}>Precio</th>
            <th className="text-center" style={{ width: "9.1%" }} onClick={() => onSort('Stock')}>Stock</th>
            <th className="text-center" style={{ width: "11.1%" }} onClick={() => onSort('FechaAlta')}>Fecha de Alta</th>
            <th className="text-center" style={{ width: "8.1%" }} onClick={() => onSort('Activo')}>Activo</th>
            <th className="text-center text-nowrap" style={{ width: "11.1%" }} >Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Autos &&
            Autos.map((Item) => (
              <tr key={Item.IdAuto}>
                <td>{Item.Nombre}</td>
                <td>{TipoVehiculo.find((x) => x.IdTipoVehiculo === Item.IdTipoVehiculo)?.Nombre || "N/A"}</td>
                <td className="text-center">{Marcas.find((x) => x.IdMarca === Item.IdMarca)?.Nombre || "N/A"}</td>
                <td className="text-center">{Paises.find((x) => x.IdPais === Marcas.find((x) => x.IdMarca === Item.IdMarca)?.Sede)?.Nombre || "N/A"}</td>
                <td className="text-center">$ {Item.Precio}</td>
                <td className="text-center">{Item.Stock}</td>
                <td className="text-center">{moment(Item.FechaAlta).format("DD/MM/YYYY")}</td>
                <td className="text-center">{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button className="btn btn-sm btn-outline-primary" title="Consultar" onClick={() => Consultar(Item)}>
                    <i className="fa fa-eye"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-primary" title="Modificar" onClick={() => Modificar(Item)}>
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={"btn btn-sm " + (Item.Activo ? "btn-outline-danger" : "btn-outline-success")}
                    title={Item.Activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i className={"fa fa-" + (Item.Activo ? "times" : "check")}></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador */}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Página: &nbsp;
            <select value={Pagina} onChange={(e) => Buscar(Number(e.target.value), sortConfig.key, sortConfig.direction)}>
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
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
