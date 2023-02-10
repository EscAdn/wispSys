import React from "react";
import { formatoFecha } from "../../../helpers/helpDate";
import { helpHttp } from "../../../helpers/helpHttp";
import Card from "../../extras/Card";
import Message from "../../extras/Message";
import Form from "./address/Form";
import Table from "./address/Table";

const Addresses = ({
  url,
  db,
  setDb,
  dataToEdit,
  setDataToEdit,
  error,
  setError,
}) => {
  // Nuevo registro
  const createData = async (data) => {
    delete data.id;
    data.address = data.name;
    let fecha = formatoFecha(new Date(), "yyyy/mm/dd");
    data.created_at = fecha;
    data.updated_at = fecha;

    // address, created_at, updated_at;
    let res = await helpHttp().post(url, {
      body: data,
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      // setError(res);
      console.log(resp);
      return;
    }

    data.id = res.insertId;
    setDb([...db, data]);
  };

  // Editar registro
  const updateData = async (data) => {
    let fecha = formatoFecha(new Date(), "yyyy/mm/dd");
    data.updated_at = fecha;
    data.address = data.name;

    let { address, updated_at } = data;

    let resp = await helpHttp().put(`${url}/${data.id}`, {
      body: { address, updated_at },
      headers: { "content-type": "application/json" },
    });

    if (resp.err) {
      // setError(resp);
      console.log(resp);
      return;
    }

    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  // Eliminar registro
  const deleteData = async (id) => {
    let isConfirm = window.confirm("¿Desea eliminar al id " + id + "?");

    if (isConfirm) {
      let resp = await helpHttp().del(`${url}/${id}`);

      if (resp.err) {
        // setError(resp);
        console.log(resp);
        return;
      }

      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  };

  if (error) {
    return (
      <Card>
        <Message msg={`${error.status} - ${error.statusText}`} />
      </Card>
    );
  }

  return (
    <div className="col-12 h-max scroll overflow-auto">
      <Form
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <div className="bg-white col-sm-12 p-3">
        <Table
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </div>
    </div>
  );
};

export default Addresses;
