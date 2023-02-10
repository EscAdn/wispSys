import React from "react";

const Input = ({ label, col = "", type = "text", ...rest }) => {
  return (
    <div className={`col-sm-12 ${col} form-floating mb-2`}>
      <input
        type={type}
        autoComplete="off"
        className="form-control"
        id="floatingName"
        {...rest}
      />
      <label htmlFor="floatingName">{label}</label>
    </div>
  );
};

export default Input;
