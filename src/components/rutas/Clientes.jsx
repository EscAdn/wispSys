import React, { useEffect, useState } from "react";
import { formatoFecha } from "../../helpers/helpDate";
import { helpHttp } from "../../helpers/helpHttp";
import Card from "../extras/Card";
import { Header } from "../extras/Header";
import Layout from "../extras/Layout";
import Form from "./Clientes/Form";
import Table from "./Clientes/Table";
import Message from "../extras/Message";

const urlAddress = "http://localhost:3020/api/address";
const url = "http://localhost:3020/api/client";

const Clientes = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [errorDb, setErrorDb] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    // Obteniendo las direcciones para el Select
    const getAddress = async () => {
      const resp = await helpHttp().get(urlAddress);
      if (resp.err) {
        setErrorAddress(resp);
        setDb([]);
      } else {
        setErrorAddress(null);
        setAddress(resp);
      }
    };
    // Obteniendo la lista de Clientes
    const getClients = async () => {
      const resp = await helpHttp().get(url);
      if (resp.err) {
        setErrorDb(resp);
        setDb(null);
      } else {
        setErrorDb(null);
        setDb(resp);
      }
    };

    getAddress();
    getClients();
  }, [url]);

  const createData = async (data) => {
    delete data.id;
    data.address_id = parseInt(data.address_id);
    let fecha = formatoFecha(new Date(), "yyyy/mm/dd");
    data.created_at = fecha;
    data.updated_at = fecha;

    let resp = await helpHttp().post(url, {
      body: data,
      headers: { "content-type": "application/json" },
    });

    if (resp.err) {
      // setError(resp);
      console.log(resp);
      return;
    }

    let addressName = address.find((x) => x.id === data.address_id);
    data.address = addressName.name;
    data.id = resp.insertId;
    setDb([...db, data]);
  };

  const updateData = async (data) => {
    data.updated_at - formatoFecha(new Date(), "yyyy/mm/dd");
    data.address_id = parseInt(data.address_id);

    const { name, telephone, address_id, updated_at } = data;

    let resp = await helpHttp().put(`${url}/${data.id}`, {
      body: { name, telephone, address_id, updated_at },
      headers: { "content-type": "application/json" },
    });

    if (resp.err) {
      // setError(resp);
      console.log(resp);
      return;
    }
    data.address = address.find((x) => x.id === data.address_id).name;
    let newDate = db.map((x) => (x.id === data.id ? data : x));

    setDb(newDate);
  };

  const deleteData = async (id) => {
    let isConfirm = window.confirm("¿Desea eliminar al id " + id + "?");

    if (isConfirm) {
      let resp = await helpHttp().del(`${url}/${id}`);

      if (typeof resp == "string") {
        setError({ err: "El Cliente tiene un Contrato activo" });
        return;
      }

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

  if (errorDb) {
    return (
      <div className="mt-4 p-5">
        <Message msg={`Clients: ${errorDb.status} - ${errorDb.statusText}`} />
      </div>
    );
  }

  if (errorAddress) {
    return (
      <div className="mt-4 p-5">
        <Message
          msg={`Addresses: ${errorAddress.status} - ${errorAddress.statusText}`}
        />
      </div>
    );
  }

  return (
    <>
      <Header title="Clientes" />
      <Layout>
        <Card md="col-md-4">
          <Form
            address={address}
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
        </Card>
        <Card md="col-md-8">
          <Table
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        </Card>
      </Layout>
    </>
  );
};

export default Clientes;
