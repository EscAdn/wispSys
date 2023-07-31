import { useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from "yup";

// Components
import ButtonsForm from "../../extras/ButtonsForm";
import Input from "../../extras/Input";
import Select from "../../extras/Select";

const initialForm = {
  id: null,
  concept: "",
  amount_income: 0,
  amount_discharge: 0,
};

const Formulario = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleSubmit = async (values, actions) => {
    let respuesta = {};

    if (!values.id) {
      respuesta = await createData(values);
    } else {
      respuesta = await updateData(values);
    }

    if(!respuesta){
      actions.resetForm();
      setDataToEdit(false);
    }
  };

  const validate =  Yup.object({
    concept: Yup.string().required("Obligatorio"),
    client_name: Yup.string().typeError("Ingrese un cliente valido"),
    amount_incomes: Yup.number().typeError("Debe ser un número"),
    amount_discharge: Yup.number().typeError("Debe ser un número"),
  });

  return (
    <Formik 
      className="col-sm-12"
      enableReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={form}
      onReset={() => {}}
      validationSchema={validate}
    >
      <Form className="text-center px-4 pt-1">
        <h5 className="card-header bg-white">
          <span className="h4 fw-bold">
            {dataToEdit ? "Modificar" : "Registrar"}
          </span>
        </h5>
        <div className="card-body">
          <Input
            label="Concepto"
            name="concept"
          />
          <Input
            label="Ingreso"
            name="amount_income"
            type="number"
            step="10"
            min="0"
          />
          <Input
            label="Egreso"
            name="amount_discharge"
            type="number"
            step="50"
            min="0"
          />
        </div>
        <ButtonsForm setDataToEdit={setDataToEdit} dataToEdit={dataToEdit} />
      </Form>
    </Formik>
  );
};

export default Formulario;
