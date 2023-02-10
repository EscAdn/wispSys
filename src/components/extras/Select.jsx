import React, { useState } from "react";
import Message from "./Message";

const Select = ({ data, col = "", label, ...rest }) => {
  if (!data)
    return (
      <Message
        msg={`Error Direcciones no cargadas - Recargue la página`}
        bg="danger"
      />
    );

  if (data.length === 0) {
    return <Message msg={`${label} Error: No se encontraton datos`} />;
  }

  return (
    <div className={`col-sm-12 ${col} form-floating mb-3`}>
      <select className="form-select" {...rest}>
        <option value="0">Seleccione...</option>
        {data.length > 0 &&
          data.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
      </select>
      <label htmlFor="floating">{label}</label>
    </div>
  );
};

export default Select;
