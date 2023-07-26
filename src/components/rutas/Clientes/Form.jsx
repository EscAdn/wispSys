import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Components
import ButtonsForm from "../../extras/ButtonsForm";
import Input from "../../extras/Input";
import Select from "../../extras/Select";

const initialForm = {
  id: null,
  name: "",
  telephone: "",
  address_id: 0,
};

const Formulario = ({
  address,
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

    if (!respuesta) {
      actions.resetForm();
      setDataToEdit(false);
    }
  };

  const validate = Yup.object({
    name: Yup.string().required("Obligatorio"),
    telephone: Yup.number().typeError("Deben ser un numero telefonico valido"),
    address_id: Yup.number()
      .required("Obligatorio")
      .min(1, "Seleccione una direccion"),
  });

  return (
    <Formik
      className="col-sm-12"
      enableReinitialize={true}
      initialValues={form}
      onSubmit={handleSubmit}
      onReset={() => {}}
      validationSchema={validate}
    >
      <Form className="text-center p-4">
        <h5 className="card-header bg-white">
          <span className="h4 fw-bold">
            {dataToEdit ? "Modificar" : "Registrar"}
          </span>
        </h5>
        <div className="card-body">
          <Input label="Nombre Completo" name="name" />
          <Input label="Teléfono" name="telephone" />
          <Select data={address} label="Dirección/Zona" name="address_id" />
          <ButtonsForm dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
        </div>
      </Form>
    </Formik>
  );
};

export default Formulario;
