import { useEffect, useState } from "react";

// Components
import Input from "../../../extras/Input";
import Select from "../../../extras/Select";

const initialForm = { id: null, address_id: 0, details: "", ports: 8 };

const Form = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  address,
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
            <span className="h5 fw-bold">
              {dataToEdit ? "Modificar" : "Registrar"}
            </span>
          </h5>
          <div className="card-body row g-2">
            <Input
              label="Detalles/Caja/Nodo"
              onChange={handleChange}
              value={form.details}
              name="details"
            />
            <Select
              data={address}
              col="col-md-6"
              label="Nodo/Caja"
              onChange={handleChange}
              value={form.address_id}
              name="address_id"
            />
            <Input
              type="number"
              col="col-md-6"
              label="No. de Puertos"
              onChange={handleChange}
              value={form.ports}
              name="ports"
              step="8"
              min="8"
              max="16"
              autoComplete="off"
              placeholder="No. de Puertos"
            />
          </div>
          <div className="container-fluit">
            <button className="btn btn-wisp">
              <i className="fas fa-save"></i>&nbsp;
              {dataToEdit ? "Modificar" : "Registrar"}
            </button>
            &nbsp;
            <a className="btn btn-wisp" onClick={handleReset}>
              <i className="fas fa-broom"></i>&nbsp;Limpiar
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
