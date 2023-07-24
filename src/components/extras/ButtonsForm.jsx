import React from "react";

const ButtonsForm = ({ dataToEdit }) => {
  return (
    <div className="container-fluit">
      <button className="btn btn-wisp" type="submit">
        <i className="fas fa-save"></i>&nbsp;
        {dataToEdit ? "Modificar" : "Registrar"}
      </button>
      &nbsp;
      <button className="btn btn-wisp" type="reset">
        <i className="fas fa-broom"></i>&nbsp;Limpiar
      </button>
    </div>
  );
};

export default ButtonsForm;
