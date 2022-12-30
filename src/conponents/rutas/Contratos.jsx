import { Header } from "../extras/Header";
import Formulario from "./../extras/useFormulario";

export const Contratos = () => {

  const inputs = [
    {select: true, label: "Cliente", name: "id_cliente", required: true, id: "floatingCliente",
      options: []},
    {select: true, label: "Plan", name: "id_plan", required: true, id: "floatingPlan", 
      options: []},
    {label: "Direccion IP", name: "ip", required: true, id: "floatingIp"},
    {label: "Direccion MAC", name: "mac", required: true, id: "floatingMac"},
    {label: "No Serie", name: "serie", id: "floatingSerie"},
    {label: "Fecha de Registro", name: "fecha", type: "date", required: true, id: "floatingFecha"},
  ]

  return (
    <>
      <Header title="Contratos" />
      <div id="contenido" className="row p-3 m-1 w-100">
          <Formulario data={inputs} />
      </div>
    </>
  );
};
