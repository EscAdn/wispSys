import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import Table from "./Invoices/Table";

const url = "http://localhost/3021/api/invoice";

const Invoices = ({ db }) => {
  // const [dataToEdit, setDataToEdit] = useState(null);
  // const [error, setError] = useState(null);

  return (
    <>
      <Table data={db} />
    </>
  );
};

export default Invoices;
