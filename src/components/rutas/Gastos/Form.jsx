import React, { useState } from "react";

import ButtonsForm from "../../extras/ButtonsForm";
import Input from "../../extras/Input";
import Select from "../../extras/Select";

const initialForm = {
  id: null,
  concept: "",
  payment_type_id: null,
  client_name: "",
  amount_incomes: 0,
  amount_discharge: 0,
};

const Form = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  const handleSubmit = () => {};

  const handleChange = (e) => {
    e.preventDefault();

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset(e);
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
            data={[]}
            label="Cliente"
            name="client_id"
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
