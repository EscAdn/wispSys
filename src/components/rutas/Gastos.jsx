import { useEffect, useState } from "react";

// Helpers
import { urls } from "../../utils/endpoints";
import { helpHttp } from "../../helpers/helpHttp";
import { formatoFecha } from "../../helpers/helpDate";

// Components
import Header from "../extras/Header";
import Layout from "../extras/Layout";
import Card from "../extras/Card";
import Table from "./Gastos/Table";
import Form from "./Gastos/Form";
import Loading from "../extras/Loading";
import Message from "../extras/Message";

const Gastos = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [payment_type, setPayment_type] = useState(null);
  const [errorpt, setErrorPT] = useState(null);

  const getBills = async () => {
    const resp = await helpHttp().get(urls.url_bills);
    if (resp.err) {
      setError(resp);
      setDb(null);
    } else {
      setError(null);
      setDb(resp);
    }
  };

  const getPaymentsTypes = async () => {
    const resp = await helpHttp().get(urls.url_payments_types);
    if (resp.err) {
      setErrorPT(resp);
      setPayment_type(null);
    } else {
      setErrorPT(null);
      setPayment_type(resp);
    }
  };

  useEffect(() => {
    getBills();
    getPaymentsTypes();
  }, []);

  const createData = async (data) => {
    data.payment_type_id = parseInt(data.payment_type_id);

    const res = await helpHttp().post(urls.url_bills, {
      body: data,
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setError(res);
      return;
    }
    data.created_at = formatoFecha(new Date(), "yyyy/mm/dd");
    data.id = res.insertId;
    data.pt_name = payment_type.find((x) => x.id === data.payment_type_id).name;
    setDb([...db, data]);
  };

  const updateData = () => {};

  if (error || errorpt) {
    return (
      <Card>
        {error && (
          <Message msg={`Bills: ${error.status} - ${error.statusText}`} />
        )}
        {errorpt && (
          <Message
            msg={`Payments_Types: ${error.status} - ${error.statusText}`}
          />
        )}
      </Card>
    );
  }

  return (
    <>
      <Header title="Gastos" />
      {db || payment_type ? (
        <Layout>
          <Card md="col-md-3">
            <Form
              payments_types={payment_type}
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />
          </Card>
          <Card md="col-md-9">
            <Table data={db} setDataToEdit={setDataToEdit} />
          </Card>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Gastos;
