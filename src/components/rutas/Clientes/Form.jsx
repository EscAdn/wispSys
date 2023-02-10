import React, { useState } from "react";
import { useEffect } from "react";
import ButtonsForm from "../../extras/ButtonsForm";
import Input from "../../extras/Input";
import Select from "../../extras/Select";

const initialForm = {
  id: null,
  name: "",
  telephone: "",
  address_id: 0,
};

const Form = ({
  address,
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
          <Input
            label="Nombre Completo"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            label="Teléfono"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
          />
          <Select
            data={address}
            label="Dirección/Zona"
            name="address_id"
            value={form.address_id}
            onChange={handleChange}
          />
          <ButtonsForm onClick={handleReset} dataToEdit={dataToEdit} />
        </div>
      </form>
    </div>
  );
};

export default Form;
