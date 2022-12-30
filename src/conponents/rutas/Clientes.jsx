import { Header } from "../extras/Header";
import FilterTable from "../extras/FilterTable"
import { Formulario } from "./Clientes/Formulario";
import Table from "../extras/Table";

export const Clientes = () => {
  return (
    <>
      <Header title="Clientes" />
      <div id="contenido" className="row p-3 m-1 w-100">
        <div className="col-sm-12 col-md-4">
          <Formulario />
        </div>
        <div className="card col-sm-12 col-md-8 p-3">
          <FilterTable label="Nombre, Direccion, Telefono..." idTable='forTableClients' />
          <Table />
        </div>
      </div>
    </>
  );
};
