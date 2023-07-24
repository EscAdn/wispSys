import { useEffect, useState } from "react";

// Components
import ButtonsForm from "../../../extras/ButtonsForm";
import Input from "../../../extras/Input";

const initialForm = { id: null, name: "" };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = {};
    
    if (form.id === null) {
      resp = await createData(form);
    } else {
      resp = await updateData(form);
    }
    
    !resp && handleReset(e);

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
          <div className="card-body">
            <Input
              label="Dirección/Zona"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <ButtonsForm onClick={handleReset} dataToEdit={dataToEdit} />
        </form>
      </div>
    </>
  );
};

export default Form;
