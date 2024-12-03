import React, { useState, useEffect } from "react";
import moment from "moment";
import AutosBuscar from "./AutosBuscar";
import AutosListado from "./AutosListado";
import AutosRegistro from "./AutosRegistro";
import { paisesService } from "../../services/paises.service";
import { autosService } from "../../services/autosJWT.service";
import { marcasService } from "../../services/marcas.service";
import { tipoVehiculoService } from "../../services/tipoVehiculo.service";
import modalDialogService from "../../services/modalDialog.service";

function AutosJWT({ userRole }) { // Assuming userRole is passed as a prop
  const tituloPagina = "Autos (Administradores)";
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");
  const [Autos, setAutos] = useState(null);
  const [Item, setAuto] = useState(null); // usado en BuscarPorId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [Marcas, setMarcas] = useState(null);
  const [Paises, setPaises] = useState(null);
  const [TipoVehiculo, setTipoVehiculo] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    const fetchPaises = async () => {
      const data = await paisesService.Buscar();
      setPaises(data);
    };

    const fetchMarcas = async () => {
      const data = await marcasService.Buscar();
      setMarcas(data);
    };

    const fetchTipoVehiculo = async () => {
      const data = await tipoVehiculoService.Buscar();
      setTipoVehiculo(data);
    };

    fetchPaises();
    fetchMarcas();
    fetchTipoVehiculo();
  }, []);

  async function Buscar(_pagina, sortKey = null, sortDirection = 'asc') {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }

    try {
      const data = await autosService.Buscar(Nombre, Activo, _pagina, sortKey, sortDirection);
      setAutos(data.Items);
      setRegistrosTotal(data.RegistrosTotal);

      // generar array de las páginas para mostrar en select del paginador
      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    } catch (error) {
      console.error("Error al buscar datos en el servidor!", error);
    }
  }

  async function BuscarPorId(item, accionABMC) {
    try {
      const data = await autosService.BuscarPorId(item);
      setAuto(data);
      setAccionABMC(accionABMC);
    } catch (error) {
      console.error("Error al buscar el auto por ID!", error);
    }
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    if (!item.Activo) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M");
  }

  function Agregar() {
    setAccionABMC("A");
    setAuto({
      IdAuto: 0,
      Nombre: "",
      Precio: "",
      IdMarca: "",
      Stock: "",
      FechaAlta: moment(new Date()).format("YYYY-MM-DD"),
      Activo: true,
    });
  }

  function Imprimir() {
    window.print();
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Está seguro que quiere " +
      (item.Activo ? "desactivar" : "activar") +
      " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        try {
          await autosService.ActivarDesactivar(item);
          await Buscar();
        } catch (error) {
          console.error("Error al activar/desactivar el auto!", error);
        }
      }
    );
  }

  async function Grabar(item) {
    try {
      await autosService.Grabar(item);
      await Buscar();
      Volver();
      setTimeout(() => {
        modalDialogService.Alert(
          "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
        );
      }, 0);
    } catch (error) {
      console.log(error?.response?.data?.message ?? error.toString());
    }
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        {tituloPagina} - <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <AutosBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resultados de búsqueda y Paginador */}
      {AccionABMC === "L" && Autos?.length > 0 && (
        <AutosListado
          {...{
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
          }}
        />
      )}

      {AccionABMC === "L" && Autos?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <AutosRegistro {...{ AccionABMC, Marcas, TipoVehiculo, Item, Grabar, Volver }} />
      )}
    </div>
  );
}

export { AutosJWT };
