import React, { useEffect, useState } from "react";

const initialForm = { id: null, name: "", url: "" };

export const Form = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
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

    if (!form.name || !form.url) {
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
    <>
      <div className="col-sm-12 col-md-4 col-lg-5">
        <form className="card text-center p-4" onSubmit={handleSubmit}>
          <h5 className="card-header bg-white">
            <span className="h3 fw-bold">
              {dataToEdit ? "Modificar" : "Registrar"}
            </span>
          </h5>
          <div className="card-body">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingAddress"
                placeholder="Direccion"
                onChange={handleChange}
                value={form.name}
                name="name"
              />
              <label htmlFor="floatingAddress">Tegnlogia</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="url"
                type="text"
                className="form-control"
                id="floatingUrl"
                placeholder="Url"
                onChange={handleChange}
                value={form.url}
              />
              <label htmlFor="floatingUrl">URL</label>
            </div>
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
