import React, { useEffect, useState } from "react";
import { Header } from "../extras/Header";
import { Form } from "./Configuracion/Form";
import { TablaAddress } from "./Configuracion/TablaAddress";
import { helperHttp } from "../../helpers/helperHttp";
import { formatoFecha } from "../../helpers/helpDate";

// const apiUrl = "http://localhost:3020/api/address";

export const Configuracion = () => {
  // Estados del cpomponente
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  let api = helperHttp();
  let url = "http://localhost:3020/api/address";

  const getAddress = async (url) => {
    try {
      // await helperHttp()
      //   .get(url)
      //   .then((res) => {
      //     if (!res.err && res.length > 0) {
      //       setDb(res);
      //       setError(null);
      //     } else {
      //       setDb([]);
      //       res.err
      //         ? setError(res)
      //         : setError({ error: "Probelmas al obtener datos :(" });
      //     }
      //   });
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getAddress(url);
  }, []);

  // Nuevo registro
  const createData = async (data) => {
    delete data.id;
    let create_at = formatoFecha(new Date(), "yyyy/mm/dd");
    data.create_at = create_at;
    data.updated_at = create_at;

    console.log(data);
    let res = await api
      .post(url, { body: data })
      .then((res) => console.log(res));

    if (res.err) return;

    // await console.log(data);
    data.id = db.length + 99 || Date.now();
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
        <div className="col-sm-12 col-md-8 col-lg-7 card p-3">
          <TablaAddress
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
            er={error}
          />
        </div>
      </div>
    </div>
  );
};
