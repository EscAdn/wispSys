import { useEffect, useState } from "react";

// Helpers
import { helpHttp } from "../../../helpers/helpHttp";

// Components
import Form from "./nodes/Form";
import TablaNodes from "./nodes/Table";
import Message from "../../extras/Message";
import Card from "../../extras/Card";
import Loading from "../../extras/Loading";

const Nodes = ({ url, address }) => {
  const [nodes, setNodes] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [respError, setRespError] = useState(false);

  const getNodes = async (url) => {
    const resp = await helpHttp().get(url);
    if (resp.err) {
      setError(resp);
      setNodes(null);
    } else {
      setError(null);
      setNodes(resp);
    }
  };

  useEffect(() => {
    getNodes(url);
    console.log("Nodes");
  }, []);

  // Nuevo registro
  const createData = async (data) => {
    delete data.id;
    data.address_id = parseInt(data.address_id);
    data.ports = parseInt(data.ports);

    let { address_id, details, ports } = data;

    let res = await helpHttp().post(url, {
      body: { address_id, details, ports },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setRespError(res);
      return {err: res.err};
    }

    data.id = res.insertId;
    data.disponibles = 0;
    data.usados = 0;
    //Colocar la zona en texto
    data.address = address.find((x) => x.id === data.address_id).name;
    setNodes([...db, data]);
    return null;
  };

  // Editar registro
  const updateData = async (data) => {
    data.address_id = parseInt(data.address_id);
    data.ports = parseInt(data.ports);

    let { address_id, details, ports } = data;

    let res = await helpHttp().put(`${url}/${data.id}`, {
      body: { address_id, details, ports },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setRespError(res);
      return {err: resp.err};
    }

    data.address = address.find((x) => x.id === data.address_id).name;

    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
    return null;
  };

  if (error) {
    return (
      <Card>
        <Message msg={`${error.status} - ${error.statusText}`} />
      </Card>
    );
  }

  return (
    <>
      {nodes ? (
        <div className="col-12 h-max scroll overflow-auto">
          {respError && <Message msg={`${respError.status} - ${respError.statusText}`} />}
          <Form
            address={address}
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
          <div className="bg-white col-sm-12 p-3">
            <TablaNodes data={nodes} setDataToEdit={setDataToEdit} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Nodes;
