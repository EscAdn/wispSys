import React, { useEffect, useState } from "react";
import { urls } from "../../utils/endpoints";
import { helpHttp } from "../../helpers/helpHttp";

import Header from "../extras/Header";
import Layout from "../extras/Layout";
import Card from "../extras/Card";

import Table from "./Gastos/Table";
import Form from "./Gastos/Form";

const Gastos = () => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [db, setDb] = useState([]);
  const [error, setError] = useState(null);

  const getBills = async () => {
    const resp = await helpHttp().get(urls.url_bills);
    if (resp.err) {
      setError(resp);
      setDb([]);
    } else {
      setError(null);
      setDb(resp);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  const createData = () => {};

  const updateData = () => {};

  return (
    <>
      <Header title="Gastos" />
      <Layout>
        <Card md="col-md-3">
          {/* <Form
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          /> */}
        </Card>
        <Card md="col-md-9">
          <Table data={db} />
        </Card>
      </Layout>
    </>
  );
};

export default Gastos;
