import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import { urls } from "../../utils/endpoints";

import Card from "../extras/Card";
import { Header } from "../extras/Header";
import Layout from "../extras/Layout";
import Message from "../extras/Message";
import Addresses from "./Configuracion/Addresses";
import Nodes from "./Configuracion/Nodes";

const Configuracion = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obteniendo las direcciones para el Select
    const getAddress = async () => {
      const resp = await helpHttp().get(urls.url_address);
      if (resp.err) {
        setError(resp);
        setDb([]);
      } else {
        setError(null);
        setDb(resp);
      }
    };

    getAddress();
  }, []);

  if (error) {
    return (
      <Card>
        <Message msg={`${error.status} - ${error.statusText}`} />
      </Card>
    );
  }

  return (
    <>
      <Header title="Configuración" />
      <Layout>
        <Card md="col-md-5">
          <h6 className="text-center fw-bold">Direcciones/Zonas</h6>
          <Addresses
            url={urls.url_address}
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
          <Nodes url={urls.url_nodes} address={db} />
        </Card>
      </Layout>
    </>
  );
};

export default Configuracion;
