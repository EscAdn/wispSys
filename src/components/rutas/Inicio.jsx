import { useEffect, useState } from "react";

import { helpHttp } from "../../helpers/helpHttp";
import { urls } from "../../utils/endpoints";

import Header from "../extras/Header";
import Layout from "./../extras/Layout";
import Card from "./../extras/Card";
import Message from "../extras/Message";
import Table from "./Invoices/Table";
import Loading from "../extras/Loading";

export const Inicio = () => {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);

  const getData = async () => {
    const resp = await helpHttp().get(urls.url_invoices);
    if (resp.err) {
      setError(resp);
      setDb(null);
    } else {
      setError(null);
      setDb(resp);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return (
      <Card>
        <Message msg={`${error.status}: ${error.statusText}`} />
      </Card>
    );
  }

  return (
    <>
      <Header title="Inicio" />
      {db ? (
        <Layout>
          <Card md="col-md-3">Tareas Pendientes</Card>
          <Card md="col-md-9">
            <Table data={db} setDataToEdit={undefined} />
          </Card>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};
