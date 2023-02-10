import { Header } from "../extras/Header";
import { useEffect, useState } from "react";
import Form from "./Contratos/Form";
import { formatoFecha } from "../../helpers/helpDate";
import { helpHttp } from "../../helpers/helpHttp";
import Table from "./Contratos/Table";
import Message from "../extras/Message";

const url = "http://localhost:3020/api/";

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
    getHttp(`${url}contract`, setDb, setErrorDb);
    getHttp(`${url}client`, setClients, setErrorClients);
    getHttp(`${url}plan`, setPlans, setErrorPlans);
  }, []);

  const createData = async (data) => {
    delete data.id;
    delete data.node_id;

    let fecha = formatoFecha(new Date(), "yyyy/mm/dd");
    data.created_at = fecha;
    data.updated_at = fecha;

    let {
      client_id,
      plan_id,
      server_id,
      ip,
      netmask,
      mac_address,
      details,
      created_at,
      updated_at,
    } = data;

    let res = await helpHttp().post(`${url}contract`, {
      body: {
        client_id,
        plan_id,
        server_id,
        ip,
        netmask,
        mac_address,
        details,
        created_at,
        updated_at,
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
    data.updated_at = formatoFecha(new Date(), "yyyy/mm/dd");
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
      updated_at,
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
        updated_at,
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
      <div className="conatiner row">
        <div className="col-sm-12 col-md-4 card p-2">
          <Form
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            clients={clients}
            plans={plans}
          />
        </div>
        <div className="col-sm-12 col-md-8 card p-2">
          <Table
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        </div>
      </div>
    </>
  );
};

export default Contratos;
