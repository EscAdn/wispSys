import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Components
import Input from "../../extras/Input";
import Select from "../../extras/Select";
import ButtonsForm from "./../../extras/ButtonsForm";

const initialForm = {
  id: null,
  client_id: 0,
  plan_id: 0,
  server_id: 1,
  day_cut: 1,
  state: "",
  ip: "",
  netmask: "255.255.255.0",
  mac_address: "",
  details: "",
  node_id: 1,
};

const Formulario = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  clients,
  plans,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm({ ...dataToEdit });
    } else {
      setForm({ ...initialForm });
    }
  }, [dataToEdit]);

  const handleSubmit = async (values, actions) => {
    let resespuesta = {};
    if (!values.id) {
      resespuesta = await createData(values);
    } else {
      resespuesta = await updateData(values);
    }

    if (!respuesta) {
      actions.resetForm();
      setDataToEdit(false);
    }
  };

  const validate = Yup.object({
    client_id: Yup.number()
      .required("Seleccione un Cliente")
      .typeError("Debe ser un Cliente"),
    plan_id: Yup.number()
      .required("Seleccione un Plan")
      .typeError("Debe ser un Plan"),
    day_cut: Yup.number()
      .required("Obligatorio")
      .typeError("Debe ser un numero"),
    ip: Yup.string().required("Obligatorio"),
    netmask: Yup.string().required("Obligatorio"),
    mac_address: Yup.string().required("Obligatorio"),
    details: Yup.string(),
    node_id: Yup.number()
      .required("Seleccione un Nodo")
      .typeError("Debe ser un Nodo"),
  });

  return (
    <>
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
            <Select data={clients} label="Cliente" name="client_id" />
            <Select data={plans} label="Cliente" name="plan_id" />
            <Input label="IP" name="ip" />
            <Input label="Subred" name="netmask" />
            <Input label="MAC" name="mac_address" />
            <Input label="Corte" name="day_cut" />
          </div>
          <ButtonsForm setDataToEdit={setDataToEdit} dataToEdit={dataToEdit} />
        </Form>
      </Formik>
    </>
  );
};

export default Formulario;
