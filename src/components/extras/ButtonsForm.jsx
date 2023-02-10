import React from "react";

const ButtonsForm = ({ onClick, dataToEdit }) => {
  return (
    <div className="container-fluit">
      <button className="btn btn-wisp">
        <i className="fas fa-save"></i>&nbsp;
        {dataToEdit ? "Modificar" : "Registrar"}
      </button>
      &nbsp;
      <a className="btn btn-wisp" onClick={onClick}>
        <i className="fas fa-broom"></i>&nbsp;Limpiar
      </a>
    </div>
  );
};

export default ButtonsForm;
