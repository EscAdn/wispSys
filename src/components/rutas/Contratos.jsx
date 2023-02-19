import { useEffect, useState } from "react";

import { formatoFecha } from "../../helpers/helpDate";
import { helpHttp } from "../../helpers/helpHttp";
import { urls } from "../../utils/endpoints";

import Header from "../../components/extras/Header";
import Form from "./Contratos/Form";
import Table from "./Contratos/Table";
import Message from "../extras/Message";
import Layout from "../extras/Layout";
import Card from "../extras/Card";

const Contratos = () => {
  const [db, setDb] = useState([]);
  const [errorDb, setErrorDb] = useState(null);
  const [clients, setClients] = useState([]);
  const [errorClients, setErrorClients] = useState(null);
  const [plans, setPlans] = useState([]);
  const [errorPlans, setErrorPlans] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  const getHttp = async (url, setState, setError) => {
    let resp = await helpHttp().get(url);
    if (resp.err) {
      setError(resp);
      setState([]);
    } else {
      setError(null);
      setState(resp);
    }
  };

  useEffect(() => {
    getHttp(urls.url_contracts, setDb, setErrorDb);
    getHttp(urls.url_clients, setClients, setErrorClients);
    getHttp(urls.url_plans, setPlans, setErrorPlans);
  }, []);

  const createData = async (data) => {
    delete data.id;
    delete data.node_id;

    let { client_id, plan_id, server_id, ip, netmask, mac_address, details } =
      data;

    let res = await helpHttp().post(`${url}contract`, {
      body: {
        client_id,
        plan_id,
        server_id,
        ip,
        netmask,
        mac_address,
        details,
      },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setError(res);
      return;
    }

    let cliente = clients.filter((el) => el.id === parseInt(data.client_id));
    data.client = cliente[0].name;

    let planData = plans.filter((el) => el.id === parseInt(data.plan_id));
    data.plan = planData[0].name;
    data.price = planData[0].price;

    data.id = res.insertId;
    data.public_id = `RW${data.client_id}`;
    setDb([...db, data]);
  };

  const updateData = async (data) => {
    data.client_id = parseInt(data.client_id);
    data.plan_id = parseInt(data.plan_id);

    let {
      client_id,
      plan_id,
      server_id,
      state,
      ip,
      netmask,
      mac_address,
      details,
    } = data;

    let resp = await helpHttp().put(`${url}contract/${data.id}`, {
      body: {
        client_id,
        plan_id,
        server_id,
        state,
        ip,
        netmask,
        mac_address,
        details,
      },
      headers: { "content-type": "application/json" },
    });

    if (resp.err) {
      setError(res);
      return;
    }

    let planData = plans.filter((el) => el.id === data.plan_id);

    data.plan = planData[0].name;
    data.price = planData[0].price;

    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  const deleteData = async (id) => {
    let isConfirm = window.confirm("¿Desea eliminar al id " + id + "?");

    if (isConfirm) {
      let resp = await helpHttp().del(`${url}contract/${id}`);

      if (resp.err) {
        setError(res);
        return;
      }

      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  };

  const generateInvoice = async (id, created_invoice) => {
    let from = formatoFecha(new Date(), "yyyy/mm/dd");

    // contract_id, from

    // Obtener la fecha con el día dado
    console.log(id, from, created_invoice);

    // let resp = await helpHttp().post(urls.url_invoices);
    // if (resp.status !== 200) {
    //   console.log("Error al generar factura");
    // } else {
    //   console.log("Factura generada");
    // }
  };

  if (errorDb || errorClients || errorPlans) {
    return (
      <div className="mt-4 p-5">
        {errorDb && (
          <Message
            msg={`Contracts: ${errorDb.status} - ${errorDb.statusText}`}
          />
        )}
        {errorClients && (
          <Message
            msg={`Clients: ${errorClients.status} - ${errorClients.statusText}`}
          />
        )}
        {errorPlans && (
          <Message
            msg={`Plans: ${errorPlans.status} - ${errorPlans.statusText}`}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <Header title="Contratos" />
      <Layout>
        <Card md="col-md-3">
          <Form
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            clients={clients}
            plans={plans}
          />
        </Card>
        <Card md="col-md-9">
          <Table
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
            generateInvoice={generateInvoice}
          />
        </Card>
      </Layout>
    </>
  );
};

export default Contratos;