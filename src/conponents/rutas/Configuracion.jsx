import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../extras/Header";
import Addresses from "./Configuracion/Addresses";
import Nodes from "./Configuracion/Nodes";

const url = "http://localhost:3020/api/";

const Configuracion = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  const getAddress = async (url) => {
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

  useEffect(() => {
    getAddress(`${url}address`);
  }, []);

  return (
    <div>
      <Header title="Configuración" />
      <div className="row mt-1 d-flex justify-content-between">
        <div className="card col-sm-12 col-md-5 border rounded">
          <h2 className="text-center mt-1 fw-bold">Direcciones/Zonas</h2>
          <Addresses
            url={`${url}address`}
            db={db}
            setDb={setDb}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            error={error}
            setError={setError}
          />
        </div>
        <div className="card col-sm-12 col-md-7 bg-white border rounded">
          <h2 className="text-center mt-1 fw-bold">Nodos/Cajas</h2>
          <Nodes url={`${url}node`} address={db} />
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
