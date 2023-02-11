import { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import Header from "../extras/Header";
import Invoices from "./Invoices";
import Layout from "./../extras/Layout";
import Card from "./../extras/Card";
import Message from "../extras/Message";

const url = "http://localhost:3020/api/invoices";

export const Inicio = () => {
  const [db, setDb] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
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
    getData();
  }, []);

  return (
    <>
      <Header title="Inicio" />
      <Layout>
        <Card md="col-md-3">Tareas Pendientes</Card>
        <Card md="col-md-9">
          <Invoices db={db} />
        </Card>
      </Layout>
    </>
  );
};
