import React, { useEffect, useState } from "react";
import { Header } from "../extras/Header";
import { Form } from "./Configuracion/Form";
import { TablaAddress } from "./Configuracion/TablaAddress";
import { helperHttp } from "../helpers/helperHttp";

// const apiUrl = "http://localhost:3020/api/address";

export const Configuracion = () => {
  // Estados del cpomponente
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  let api = helperHttp();
  let url = "";
  useEffect(() => {
    helperHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb([]);
          setError(res);
        }
      });
  }, []);

  // Nuevo registro
  const createData = (data) => {
    data.id = Date.now();
    setDb([...db, data]);
  };

  // Editar registro
  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  // Eliminar registro
  const deleteData = (id) => {
    let isConfirm = window.confirm("¿Desea eliminar al id " + id + "?");

    if (isConfirm) {
      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  };

  return (
    <div>
      <Header title="Configuración" />
      <div className="row contenido justify-content-between">
        <Form
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <div className="col-sm-12 col-md-8 card p-3">
          <TablaAddress
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        </div>
      </div>
    </div>
  );
};
