import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import Table from "./Invoices/Table";

const url = "http://localhost/3021/api/invoice";

const Invoices = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  return (
    <>
      <Table />
    </>
  );
};

export default Invoices;
