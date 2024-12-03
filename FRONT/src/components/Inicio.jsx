import { Link } from "react-router-dom";

function Inicio() {
    return (
      <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
        <section>
            <h1>Vehiculos</h1>
            <h2>Descripción de nuestros vehículos en venta</h2>
            <p>En nuestra empresa, nos dedicamos a ofrecer una amplia variedad de vehículos para todos los gustos y necesidades. Contamos con:</p>
            <ul>
                <li>Vehículos nuevos y seminuevos de diferentes marcas y modelos.</li>
                <li>Opciones de financiamiento y leasing para facilitar la adquisición de su vehículo.</li>
                <li>Servicio de mantenimiento y garantía para asegurar la calidad y durabilidad de nuestros productos.</li>
                <li>Asesoramiento personalizado para ayudarle a elegir el vehículo que mejor se adapte a sus requerimientos.</li>
            </ul>
        </section>
        <Link to="/marcas" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Marcas
        </Link>
    </div>
  );
}
export { Inicio };
