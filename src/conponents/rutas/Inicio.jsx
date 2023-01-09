import { Header } from "../extras/Header";
import Formulario from "./../extras/useFormulario";
import FilterTable from "../extras/FilterTable";
import { useEffect, useState } from "react";

export const Inicio = () => {
  const [data, setData] = useState([]);

  const getData = async (url) => {
    let res = await fetch(url).then((r) => r.json());

    await setData(...data, res);

    await console.log(data);
  };

  useEffect(() => {
    getData("https://jsonplaceholder.typicode.com/users");
  }, []);

  // Array de imputs
  // {type="text", register, complete="off", label, name, required, id}
  // {register, label, id, name, data, required}
  const inputs = [
    { label: "Nombre", name: "nombre", required: true, id: "floatingName" },
    {
      label: "Edad",
      name: "edad",
      type: "number",
      required: true,
      id: "floatingAge",
    },
    {
      select: true,
      label: "Direccion",
      name: "direccion",
      required: true,
      id: "floatingAdress",
      options: [
        { id: 1, name: "Mantila" },
        { id: 2, name: "Calzada" },
      ],
    },
  ];

  // Array de Columnas
  // {id, titulo, scope}
  const encabezado = [
    { id: "id", titulo: "#", scope: "col" },
    { id: "name", titulo: "Nombre", scope: "col" },
    { id: "options", titulo: "Opciones", scope: "col" },
  ];

  // Array de filas
  // segun las columnas su tamaño puede variar
  const datos = [
    { id: 123, name: "Rouse Bp" },
    { id: 124, name: "Kim Young" },
    { id: 122, name: "Kim Young-jou" },
  ];

  // Sunmit

  // Reset

  return (
    <>
      <Header title="Inicio" />
      <div className="row contenido justify-content-between">
        <Formulario data={inputs} />
        <div className="col-sm-12 col-md-8 card p-3">
          <FilterTable />
          {/* <Table colums={colums} datos={data} /> */}
        </div>
      </div>
    </>
  );
};
