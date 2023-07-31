import { useState, memo } from 'react'
// Helpers
import { helpHttp } from "../../../helpers/helpHttp";

// Components
import Card from "../../extras/Card";
import Loading from "../../extras/Loading";
import Message from "../../extras/Message";
import Form from "./address/Form";
import Table from "./address/Table";

const Addresses = ({ url = "", db, setDb, dataToEdit, setDataToEdit, error }) => {
  const [respError, setRespError] = useState(false);

  // Nuevo registro
  const createData = async (data) => {
    delete data.id;

    let { name } = data;

    // address
    let res = await helpHttp().post(url, {
      body: { name },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setRespError(res);
      return {err: res.err};
    }

    data.id = res.insertId;
    setDb([...db, data]);
    return null;
  };

  // Editar registro
  const updateData = async (data) => {
    data.id = parseInt(data.id);
    let { id, name } = data;
    let res = await helpHttp().put(`${url}/${id}`, {
      body: { name },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setRespError(resp);
      return {err: res.err};
    }

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
      {db ? (
        <div className="col-12 h-max scroll overflow-auto">
          {respError && <Message msg={`${respError.status} - ${respError.statusText}`} />}
          <Form
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
          <div className="bg-white col-sm-12 p-3">
            <Table data={db} setDataToEdit={setDataToEdit} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Addresses;
