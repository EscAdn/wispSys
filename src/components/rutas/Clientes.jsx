import { useEffect, useState } from "react";

// Helpers
import { helpHttp } from "./../../helpers/helpHttp";
import { urls } from "./../../utils/endpoints";

// Components
import Card from "./../extras/Card";
import Header from "./../extras/Header";
import Layout from "./../extras/Layout";
import Form from "./Clientes/Form";
import Table from "./Clientes/Table";
import Message from "./../extras/Message";
import Loading from "./../extras/Loading";

const Clientes = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [errorDb, setErrorDb] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obteniendo las direcciones para el Select
    const getAddress = async () => {
      const resp = await helpHttp().get(urls.url_address);
      if (resp.err) {
        setErrorAddress(resp);
        setAddress(null);
      } else {
        setErrorAddress(null);
        setAddress(resp);
      }
    };
    // Obteniendo la lista de Clientes
    const getClients = async () => {
      const resp = await helpHttp().get(urls.url_clients);
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
  }, [urls.url_clients]);

  const createData = async (data) => {
    delete data.id;
    data.address_id = parseInt(data.address_id);

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
    data.id = parseInt(data.id);
    data.address_id = parseInt(data.address_id);

    const { name, telephone, address_id, updated_at } = data;

    let resp = await helpHttp().put(`${urls.url_clients}/${data.id}`, {
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
    let isConfirm = window.confirm("??Desea eliminar al id " + id + "?");

    if (isConfirm) {
      let resp = await helpHttp().del(`${urls.url_clients}/${id}`);

      if (!resp.affectedRows) {
        setError({ err: "El Cliente tiene un Contrato activo" });
        return;
      }
      console.log(typeof resp);
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

  if (errorDb || errorAddress) {
    return (
      <Card>
        {errorDb && (
          <Message msg={`Clients: ${errorDb.status} - ${errorDb.statusText}`} />
        )}
        {errorAddress && (
          <Message
            msg={`Addresses: ${errorAddress.status} - ${errorAddress.statusText}`}
          />
        )}
      </Card>
    );
  }

  return (
    <>
      <Header title="Clientes" />
      {db ? (
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Clientes;
