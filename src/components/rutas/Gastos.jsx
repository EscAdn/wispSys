import { memo, useEffect, useState } from "react";

// Helpers
import { urls } from "../../utils/endpoints";
import { helpHttp } from "../../helpers/helpHttp";
// import { formatoFecha } from "../../helpers/helpDate";

// Components
import Header from "../extras/Header";
import Layout from "../extras/Layout";
import Card from "../extras/Card";
import Table from "./Gastos/Table";
import Formulario from "./Gastos/Form";
import Loading from "../extras/Loading";
import Message from "../extras/Message";

const Gastos = () => {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [respError, setRespError] = useState(false);

  // SELECT b.id, b.concept, b.payment_type_id, pt.type, b.client_name, b.amount_income, b.amount_discharge, b.created_at, b.updated_at FROM bills as b LEFT JOIN payment_types as pt ON pt.id = b.payment_type_id;

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

  useEffect(() => {
    getBills();
  }, []);

  const createData = async (data) => {
    delete data.id;

    const res = await helpHttp().post(urls.url_bills, {
      body: data,
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setRespError(res);
      return {err: res.err};
    }

    data.created_at = "Justo Ahora";//formatoFecha(new Date(), "yyyy/mm/dd");
    data.id = res.insertId;
    setDb([...db, data]);
    setRespError(false);
    return;
  };

  const updateData = () => {};

  if (error) {
    return (
      <Card>
        <Message msg={`Bills: ${error.status} - ${error.statusText}`} />
      </Card>
    );
  }

  return (
    <>
      <Header title="Gastos" />
      {db ? (
        <Layout>
          <Card md="col-md-4">
            {respError && <Message msg={`${respError.status} - ${respError.statusText}`} />}
            <Formulario
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />
          </Card>
          <Card md="col-md-8">
              <Table data={db} setDataToEdit={setDataToEdit} />
          </Card>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default memo(() => Gastos());
