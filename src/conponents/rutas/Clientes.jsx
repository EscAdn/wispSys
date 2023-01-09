import { useEffect, useState } from "react";
import { Header } from "../extras/Header";
import Formulario from "../extras/useFormulario";
import FilterTable from "../extras/FilterTable";
import Tabla from "./Clientes/Tabla";

const url = "https://jsonplaceholder.typicode.com/";
const inputs = [
  { label: "Nombre", name: "nombre", required: true, id: "floatingName" },
  {
    label: "Telefono",
    name: "telefono",
    required: true,
    id: "floatingTelefono",
  },
  {
    select: true,
    label: "Direccion",
    name: "direccion",
    required: true,
    id: "floatingAdress",
    options: [
      { id: 1, name: "Mantila" },
      { id: 2, name: "Calzada 1ra" },
      { id: 3, name: "Calzada 2da" },
      { id: 4, name: "2da del 11" },
      { id: 5, name: "5 de Mayo" },
      { id: 6, name: "Bellota" },
    ],
  },
  {
    label: "Fecha de Registro",
    name: "fecha",
    type: "date",
    required: true,
    id: "floatingFecha",
  },
];

export const Clientes = () => {
  const [clients, setClients] = useState([]);
  const [address, setAddress] = useState([]);

  const getClients = async () => {
    let res = await fetch(url).then((r) => r.json());

    await setClients(...clients, res);
  };

  useEffect(() => {
    getClients(url + "users");
    // getAddress(url + "address");
  }, []);

  return (
    <>
      <Header title="Clientes" />
      <div className="row container justify-content-between">
        <Formulario data={inputs} />
        <div className="col-sm-12 col-md-8 card p-3">
          <FilterTable />
          <Tabla data={clients} />
        </div>
      </div>
    </>
  );
};
