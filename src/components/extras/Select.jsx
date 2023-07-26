import { useField } from "formik";
import Message from "./Message";

const Select = ({ data, col = "", label, ...props }) => {

  const [field, meta] = useField(props)

  if (!data) {
    return <Message msg={`${label} Error: No se encontraton datos`} />;
  }

  return (
    <>
      <div className={`col-sm-12 ${col} form-floating mb-3`}>
        <select className="form-select" {...field} {...props}>
          <option value="0">Seleccione...</option>
          {data.length > 0 &&
            data.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
        </select>
        <label htmlFor="floating">{label}</label>
        {meta.touched && meta.error ? (
           <div className="text-danger text-start">*{meta.error}</div>
         ) : null}
      </div>
    </>
  );
};

export default Select;
