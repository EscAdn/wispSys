import { useEffect, useState } from "react";

// Components
import Input from "../../extras/Input";
import Select from "../../extras/Select";
import ButtonsForm from "./../../extras/ButtonsForm";

const initialForm = {
  id: null,
  client_id: 0,
  plan_id: 0,
  server_id: 1,
  state: "",
  ip: "",
  netmask: "255.255.255.0",
  mac_address: "",
  details: "",
  node_id: null,
};

const Form = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  clients,
  plans,
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
    <>
      <div className="col-sm-12">
        <form className="text-center p-4" onSubmit={handleSubmit}>
          <h5 className="card-header bg-white">
            <span className="h4 fw-bold">
              {dataToEdit ? "Modificar" : "Registrar"}
            </span>
          </h5>
          <div className="card-body">
            <Select
              data={clients}
              label="Cliente"
              name="client_id"
              onChange={handleChange}
              value={form.client_id}
            />
            <Select
              data={plans}
              label="Cliente"
              name="plan_id"
              onChange={handleChange}
              value={form.plan_id}
            />
            <Input
              label="IP"
              name="ip"
              onChange={handleChange}
              value={form.ip}
            />
            <Input
              label="Subred"
              name="netmask"
              onChange={handleChange}
              value={form.netmask}
            />
            <Input
              label="MAC"
              name="mac_address"
              onChange={handleChange}
              value={form.mac_address}
            />
          </div>
          <ButtonsForm onClick={handleReset} dataToEdit={dataToEdit} />
        </form>
      </div>
    </>
  );
};

export default Form;
