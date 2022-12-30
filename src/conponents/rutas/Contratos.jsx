import { Header } from "../extras/Header";
import Formulario from "./Contratos/Formulario";

export const Contratos = () => {
  return (
    <>
      <Header title="Contratos" />
      <div id="contenido" className="row p-3 m-1 w-100">
        <div className="col-sm-12 col-md-4">
          <Formulario />
        </div>
        <div className="card col-sm-12 col-md-8 p-3">
          {/* <FilterTable label="Nombre, Direccion, Telefono..." idTable='forTableClients' /> */}
          {/* <Table /> */}
        </div>
      </div>
    </>
  );
};
