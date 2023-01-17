import { Header } from "../extras/Header";
import { useEffect, useState } from "react";
import Form from "./Contratos/Form";
import axios from "axios";
import { formatoFecha } from "../../helpers/helpDate";
import TablaContract from "./Contratos/TablaContract";

const url = "http://localhost:3020/api/";

const Contratos = () => {
  const [db, setDb] = useState([]);
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  const getContracts = async (url) => {
    try {
      await axios.get(url).then((res) => {
        if (!res.err && res.data.length > 0) {
          setDb(res.data);
          setError(null);
        } else {
          setDb([]);
          res.err
            ? setError(res)
            : setError({ error: "Probelmas al obtener datos :(" });
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  const getPlans = async (url) => {
    try {
      await axios.get(url).then((res) => {
        if (!res.err && res.data.length > 0) {
          setPlans(res.data);
        } else {
          setPlans([]);
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  const getClients = async (url) => {
    try {
      await axios.get(url).then((res) => {
        if (!res.err && res.data.length > 0) {
          setClients(res.data);
        } else {
          setClients([]);
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getContracts(`${url}contract`);
    getClients(`${url}client`);
    getPlans(`${url}plan`);
  }, []);

  const createData = async (data) => {
    delete data.id;
    delete data.node_id;

    console.log(data);

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

    let res = await axios
      .post(`${url}contract`, {
        client_id,
        plan_id,
        server_id,
        ip,
        netmask,
        mac_address,
        details,
        created_at,
        updated_at,
      })
      .then((res) => res);

    if (res.status !== 200) return;
    console.log(res);
    data.id = res.data.insertId;
    setDb([...db, data]);

    console.log(db);
  };

  const updateData = () => {};

  const deleteData = () => {};

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
          <TablaContract
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
