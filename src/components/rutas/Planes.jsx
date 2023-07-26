import { useEffect, useState, memo } from "react";

// Helpers
import { helpHttp } from "../../helpers/helpHttp";
import { urls } from "../../utils/endpoints";

// Components
import Header from "../extras/Header";
import Form from "./Planes/Form";
import Table from "./Planes/Table";
import Layout from "../extras/Layout";
import Card from "../extras/Card";
import Message from "../extras/Message";
import Loading from "../extras/Loading";

const Planes = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(false);
  const [error, setError] = useState(false);
  const [respError, setRespError] = useState(false);

  const getPlans = async () => {
    let resp = await helpHttp().get(urls.url_plans);
    if (resp.err) {
      setError(resp);
      setDb(null);
    } else {
      setError(null);
      setDb(resp);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const createData = async (data) => {
    delete data.id;

    let { name, ceil_down_mbps, ceil_up_mbps, price } = data;

    let res = await helpHttp().post(urls.url_plans, {
      body: {
        name,
        ceil_down_mbps,
        ceil_up_mbps,
        price
      },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setRespError(res);
      return { err: res.err };
    }

    data.id = res.insertId;
    setDb([...db, data]);
    return null;
  };

  const updateData = async (data) => {
    data.id = parseInt(data.id);

    let { name, ceil_down_mbps, ceil_up_mbps, price } = data;

    let res = await helpHttp().put(`${urls.url_plans}/${data.id}`, {
        body: {
          name,
          ceil_down_mbps,
          ceil_up_mbps,
          price,
        },
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => res);

    if (res.err) {
      setRespError(res);
      return { err: res.err };
    }

    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
    return;
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
      <Header title="Planes" />
      {db ? (
        <Layout>
          <Card md="col-md-5">
            {respError && <Message msg={`${respError.status} - ${respError.statusText}`} />}
            <Form createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
          </Card>
          <Card md="col-md-7">
            <Table data={db} error={error} setDataToEdit={setDataToEdit} />
          </Card>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default memo(() => Planes());
