import { useEffect, useState, memo } from "react";

// Helpers
import { helpHttp } from "../../helpers/helpHttp";
import { urls } from "../../utils/endpoints";

// Components
import Card from "../extras/Card";
import Header from "../extras/Header";
import Layout from "../extras/Layout";
import Addresses from "./Configuracion/Addresses";
import Nodes from "./Configuracion/Nodes";

const Configuracion = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  // Obteniendo las direcciones para el Select
  const getAddress = async () => {
    const resp = await helpHttp().get(urls.url_address);
    if (resp.err) {
      setError(resp);
      setDb(null);
    } else {
      setError(null);
      setDb(resp);
    }
  };
  
  useEffect(() => {
    getAddress();
    // console.log("Config Component")
  }, []);

  return (
    <>
      <Header title="Configuración" />
      <Layout>
        <Card md="col-md-6">
          <h6 className="text-center fw-bold">Direcciones/Zonas</h6>
          <Addresses
            url={urls.url_address}
            db={db}
            setDb={setDb}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            error={error}
          />
        </Card>
        <Card md="col-md-6">
          <h6 className="text-center fw-bold">Nodos/Cajas</h6>
          <Nodes url={urls.url_nodes} address={db} />
        </Card>
      </Layout>
    </>
  );
};

export default memo(() => Configuracion());
