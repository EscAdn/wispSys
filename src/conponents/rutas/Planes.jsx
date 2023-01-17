import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatoFecha } from "../../helpers/helpDate";
import { Header } from "../extras/Header";
import Form from "./Planes/Form";
import TablePlans from "./Planes/TablePlans";

const url = "http://localhost:3020/api/plan";

const Planes = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  const getPlans = async (url) => {
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
    getPlans(url);
  }, []);

  const createData = async (data) => {
    delete data.id;
    let fecha = formatoFecha(new Date(), "yyyy/mm/dd");
    data.created_at = fecha;
    data.updated_at = fecha;

    let { name, ceil_down_mbps, ceil_up_mbps, price, created_at, updated_at } =
      data;

    let res = await axios
      .post(url, {
        name,
        ceil_down_mbps,
        ceil_up_mbps,
        price,
        created_at,
        updated_at,
      })
      .then((res) => res);

    if (res.status !== 200) return;

    data.id = res.data.insertId;
    setDb([...db, data]);
  };

  const updateData = async (data) => {
    data.updated_at = formatoFecha(new Date(), "yyyy/mm/dd");

    let { name, ceil_down_mbps, ceil_up_mbps, price, updated_at } = data;

    let res = await axios
      .put(`${url}/${data.id}`, {
        name,
        ceil_down_mbps,
        ceil_up_mbps,
        price,
        updated_at,
      })
      .then((res) => res);

    if (res.status !== 200) return;

    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  return (
    <>
      <Header title="Planes" />
      <div className="conatiner row">
        <div className="col-sm-12 col-md-5 card p-2">
          <Form
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
        </div>
        <div className="col-sm-12 col-md-7 card p-2">
          <TablePlans data={db} setDataToEdit={setDataToEdit} />
        </div>
      </div>
    </>
  );
};

export default Planes;
