import React from "react";
import { useField, ErrorMessage } from 'formik'

const Input = ({ label, col = "", type = "text", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className={`col-sm-12 ${col} form-floating mb-2`}>
        <input
          type={type}
          autoComplete="off"
          className="form-control"
          id="floatingName"
          {...field}
          {...props}
        />
        <label htmlFor="floatingName">{label}</label>
        {meta.touched && meta.error ? (
           <div className="text-danger text-start error">*{meta.error}</div>
         ) : null}
      </div>
    </>
  );
};

export default Input;
