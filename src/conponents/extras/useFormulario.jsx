import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select } from "./Input";

const Formulario = ({
  title = "Registro",
  data,
  limpiar = true,
  add,
  update,
  edit,
}) => {
  const { register, handleSubmit } = useForm();

  const submitData = (data, e) => {
    if (data.id) {
      update(data);
    } else {
      add(data);
    }

    e.target.reset();
  };

  const handleReset = (e) => {};

  return (
    <div className="col-sm-12 col-md-4">
      <form
        onSubmit={handleSubmit(submitData)}
        className="card text-center p-4"
      >
        <h5 className="card-header bg-white">
          <span className="h3 fw-bold">{title}</span>
        </h5>
        <div className="card-body">
          {data.map((e) =>
            e.select ? (
              <Select
                key={e.id}
                register={register}
                label={e.label}
                id={e.id}
                name={e.name}
                data={e.options}
                required={e.required}
              />
            ) : (
              <Input
                key={e.id}
                type={e.type ? e.type : "text"}
                register={register}
                label={e.label}
                name={e.name}
                required={e.required}
                id={e.id}
              />
            )
          )}
        </div>
        <div className="container">
          <button className="btn btn-wisp">
            <i className="fas fa-save"></i>&nbsp;Enviar
          </button>
          &nbsp;
          {limpiar ? (
            <a className="btn btn-wisp" onClick={handleReset}>
              <i className="fas fa-broom"></i>&nbsp;Limpiar
            </a>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default Formulario;
