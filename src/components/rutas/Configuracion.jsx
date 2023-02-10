import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import Card from "../extras/Card";
import { Header } from "../extras/Header";
import Layout from "../extras/Layout";
import Message from "../extras/Message";
import Addresses from "./Configuracion/Addresses";
import Nodes from "./Configuracion/Nodes";

const url = "http://localhost:3020/api/";

const Configuracion = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obteniendo las direcciones para el Select
    const getAddress = async () => {
      const resp = await helpHttp().get(`${url}address`);
      if (resp.err) {
        setError(resp);
        setDb([]);
      } else {
        setError(null);
        setDb(resp);
      }
    };

    getAddress();
  }, [url]);

  return (
    <>
      <Header title="Configuración" />
      <Layout>
        <Card md="col-md-5">
          <h6 className="text-center fw-bold">Direcciones/Zonas</h6>
          <Addresses
            url={`${url}address`}
            db={db}
            setDb={setDb}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            error={error}
            setError={setError}
          />
        </Card>
        <Card md="col-md-7">
          <h6 className="text-center fw-bold">Nodos/Cajas</h6>
          <Nodes url={`${url}node`} address={db} />
        </Card>
      </Layout>
    </>
  );
};

export default Configuracion;
