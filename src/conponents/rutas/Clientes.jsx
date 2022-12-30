import { Header } from "../extras/Header";
import FilterTable from "../extras/FilterTable"
import Formulario from "../extras/useFormulario";

export const Clientes = () => {

  const inputs = [
    {label: "Nombre", name: "nombre", required: true, id: "floatingName"},
    {label: "Telefono", name: "telefono", required: true, id: "floatingTelefono"},
    {select:true, label: "Direccion", name: "direccion", required: true, id: "floatingAdress", 
      options: [
        {id: 1, name: "Mantila"}, 
        {id: 2, name: "Calzada 1ra"},
        {id: 3, name: "Calzada 2da"},
        {id: 4, name: "2da del 11"},
        {id: 5, name: "5 de Mayo"},
        {id: 6, name: "Bellota"},
      ]},
      {label: "Fecha de Registro", name: "fecha", type: "date", required: true, id: "floatingFecha"},
  ]

  return (
    <>
      <Header title="Clientes" />
      <div className="row container justify-content-between">
          <Formulario data={inputs}/>
          {/* <FilterTable label="Nombre, Direccion, Telefono..." idTable='forTableClients' />
          <Table /> */}
      </div>
    </>
  );
};
