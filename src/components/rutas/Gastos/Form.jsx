import React, { useEffect, useState } from "react";

import ButtonsForm from "../../extras/ButtonsForm";
import Input from "../../extras/Input";
import Select from "../../extras/Select";

const initialForm = {
  id: null,
  concept: "",
  payment_type_id: 0,
  client_name: "",
  amount_incomes: 0,
  amount_discharge: 0,
};

const Form = ({
  payments_types,
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset(e);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div className="col-sm-12">
      <form className="text-center p-4" onSubmit={handleSubmit}>
        <h5 className="card-header bg-white">
          <span className="h4 fw-bold">
            {dataToEdit ? "Modificar" : "Registrar"}
          </span>
        </h5>
        <div className="card-body">
          <Select
            data={payments_types}
            label="Recibido por..."
            name="payment_type_id"
            onChange={handleChange}
            value={form.payment_type_id}
          />
          <Input
            label="Ingreso"
            name="amount_incomes"
            onChange={handleChange}
            value={form.amount_incomes}
            type="number"
            step="10"
            min="0"
          />
          <Input
            label="Egreso"
            name="amount_discharge"
            onChange={handleChange}
            value={form.amount_discharge}
            type="number"
            step="50"
            min="0"
            max="1000"
          />
          <Input
            label="Concepto"
            name="concept"
            onChange={handleChange}
            value={form.concept}
          />
        </div>
        <ButtonsForm onClick={handleReset} dataToEdit={dataToEdit} />
      </form>
    </div>
  );
};

export default Form;
