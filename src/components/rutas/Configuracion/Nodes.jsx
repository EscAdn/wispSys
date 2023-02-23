import React, { useEffect, useState } from "react";
import Form from "./nodes/Form";
import { formatoFecha } from "./../../../helpers/helpDate";
import TablaNodes from "./nodes/Table";
import { helpHttp } from "../../../helpers/helpHttp";
import Message from "../../extras/Message";

const Nodes = ({ url, address }) => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  const getNodes = async (url) => {
    const resp = await helpHttp().get(url);
    if (resp.err) {
      setError(resp);
      setDb([]);
    } else {
      setError(null);
      setDb(resp);
    }
  };

  useEffect(() => {
    getNodes(url);
  }, []);

  // Nuevo registro
  const createData = async (data) => {
    delete data.id;
    data.address_id = parseInt(data.address_id);

    let { address_id, details, ports } = data;

    let res = await helpHttp().post(url, {
      body: { address_id, details, ports },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setError(res);
      return;
    }

    data.id = res.insertId;
    data.disponibles = 0;
    data.usados = 0;

    //Colocar la zona en texto
    data.address = address.find((x) => x.id === data.address_id).name;
    setDb([...db, data]);
  };

  // Editar registro
  const updateData = async (data) => {
    data.address_id = parseInt(data.address_id);
    data.ports = parseInt(data.ports);

    let { address_id, details, ports } = data;

    let res = await helpHttp().put(`${url}/${data.id}`, {
      body: { address_id, details, ports },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      // setError(res);
      console.log(res);
      return;
    }

    data.address = address.find((x) => x.id === data.address_id).name;

    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  if (error) {
    return (
      <div className="mt-4 p-5">
        <Message msg={`${error.status} - ${error.statusText}`} />
      </div>
    );
  }

  return (
    <div className="col-12 h-max scroll overflow-auto">
      <Form
        address={address}
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <div className="bg-white col-sm-12 p-3">
        <TablaNodes data={db} setDataToEdit={setDataToEdit} />
      </div>
    </div>
  );
};

export default Nodes;
