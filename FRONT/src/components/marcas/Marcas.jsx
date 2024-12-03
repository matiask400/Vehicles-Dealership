import React, { useState, useEffect } from 'react';
import { marcasService } from '../../services/marcas.service';
import { paisesService } from '../../services/paises.service'; // Ensure you have this import

function Marcas() {
  const tituloPagina = 'Marcas';
  const [marcas, setMarcas] = useState([]);
  const [paises, setPaises] = useState([]);

  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    const fetchPaises = async () => {
      const data = await paisesService.Buscar();
      setPaises(data);
    };

    const fetchMarcas = async () => {
      const data = await marcasService.Buscar();
      setMarcas(data);
    };

    fetchPaises();
    fetchMarcas();
  }, []);

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Nro Marca</th>
            <th style={{ width: "25%" }}>Nombre</th>
            <th style={{ width: "25%" }}>Slogan</th>
            <th style={{ width: "25%" }}>Sede</th>
          </tr>
        </thead>
        <tbody>
          {marcas.length > 0 && paises.length > 0 ? (
            marcas.map((marca) => (
              <tr key={marca.IdMarca}>
                <td>{marca.IdMarca}</td>
                <td>{marca.Nombre}</td>
                <td>{marca.Slogan}</td>
                <td>{paises.find((x) => x.IdPais === marca.Sede)?.Nombre || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Cargando...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { Marcas };
