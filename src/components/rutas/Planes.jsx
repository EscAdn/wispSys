import React, { useEffect, useState } from "react";

import { helpHttp } from "../../helpers/helpHttp";
import { urls } from "../../utils/endpoints";
import { formatoFecha } from "../../helpers/helpDate";

import Header from "../extras/Header";
import Form from "./Planes/Form";
import Table from "./Planes/Table";
import Layout from "../extras/Layout";
import Card from "../extras/Card";
import Message from "../extras/Message";

const Planes = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  const getPlans = async () => {
    let resp = await helpHttp().get(urls.url_plans);
    if (resp.err) {
      setError(resp);
      setDb([]);
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
    let fecha = formatoFecha(new Date(), "yyyy/mm/dd");
    data.created_at = fecha;
    data.updated_at = fecha;

    let { name, ceil_down_mbps, ceil_up_mbps, price, created_at, updated_at } =
      data;

    let res = await helpHttp().post(urls.url_plans, {
      body: {
        name,
        ceil_down_mbps,
        ceil_up_mbps,
        price,
        created_at,
        updated_at,
      },
      headers: { "content-type": "application/json" },
    });

    if (res.err) {
      setError(res);
      return;
    }

    data.id = res.insertId;
    setDb([...db, data]);
  };

  const updateData = async (data) => {
    data.updated_at = formatoFecha(new Date(), "yyyy/mm/dd");

    let { name, ceil_down_mbps, ceil_up_mbps, price, updated_at } = data;

    let res = await helpHttp()
      .put(`${urls.url_plans}/${data.id}`, {
        body: {
          name,
          ceil_down_mbps,
          ceil_up_mbps,
          price,
          updated_at,
        },
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => res);

    if (res.err) {
      setError(res);
      return;
    }

    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  if (error) {
    return (
      <div className="mt-4 p-4">
        <Message msg={`${error.status} - ${error.statusText}`} />
      </div>
    );
  }

  return (
    <>
      <Header title="Planes" />
      <Layout>
        <Card md="col-md-5">
          <Form
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
        </Card>
        <Card md="col-md-7">
          <Table data={db} error={error} setDataToEdit={setDataToEdit} />
        </Card>
      </Layout>
    </>
  );
};

export default Planes;
