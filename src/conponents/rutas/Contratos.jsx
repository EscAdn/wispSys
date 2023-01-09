import { Header } from "../extras/Header";
import Formulario from "./../extras/useFormulario";
import FilterTable from "./../extras/FilterTable";
import Tabla from "./Contratos/Tabla";
import { useEffect, useState } from "react";

const url = "";
const inputs = [
  {
    select: true,
    label: "Cliente",
    name: "id_cliente",
    required: true,
    id: "floatingCliente",
    options: [],
  },
  {
    select: true,
    label: "Plan",
    name: "id_plan",
    required: true,
    id: "floatingPlan",
    options: [],
  },
  { label: "Direccion IP", name: "ip", required: true, id: "floatingIp" },
  { label: "Direccion MAC", name: "mac", required: true, id: "floatingMac" },
  { label: "No Serie", name: "serie", id: "floatingSerie" },
  {
    label: "Fecha de Registro",
    name: "fecha",
    type: "date",
    required: true,
    id: "floatingFecha",
  },
];

export const Contratos = () => {
  const [contracts, setContracts] = useState([]);
  const [nodes, setNodes] = useState([]);

  const getContracts = async (url) => {
    let res = await fetch(url).then((r) => r.json());

    await setContracts(...contracts, res);
  };

  useEffect(() => {
    getContracts(url);
  }, []);

  return (
    <>
      <Header title="Contratos" />
      <div id="contenido" className="row p-3 m-1 w-100">
        <Formulario data={inputs} />
        <div className="col-sm-12 col-md-8 card p-3">
          <FilterTable />
          <Tabla data={[]} />
        </div>
      </div>
    </>
  );
};
