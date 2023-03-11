import { useEffect, useState } from "react";

// Components
import ButtonsForm from "../../extras/ButtonsForm";
import Input from "../../extras/Input";

const initialForm = {
  id: null,
  name: "",
  ceil_down_mbps: 0,
  ceil_up_mbps: 0,
  price: 0,
  contracts_count: 0,
};

const Form = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
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

    if (
      !form.name ||
      form.price <= 0 ||
      form.ceil_down_mbps <= 0 ||
      form.ceil_up_mbps <= 0
    ) {
      alert("Sin datos...");
      return;
    }

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
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            label="Max. Subida (Mbps)"
            name="ceil_up_mbps"
            value={form.ceil_up_mbps}
            onChange={handleChange}
            type="number"
            step="1"
            min="1"
            max="100"
          />
          <Input
            label="Max. Descargar (Mbps)"
            name="ceil_down_mbps"
            value={form.ceil_down_mbps}
            onChange={handleChange}
            type="number"
            step="1"
            min="1"
            max="100"
          />
          <Input
            label="Precio (MNX)"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            step="50"
            min="100"
            max="1000"
          />
          <ButtonsForm onClick={handleReset} dataToEdit={dataToEdit} />
        </div>
      </form>
    </div>
  );
};

export default Form;
