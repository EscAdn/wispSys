import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yub from "yup";

// Components
import ButtonsForm from "../../extras/ButtonsForm";
import Input from "../../extras/Input";

const initialForm = {
  id: null,
  name: "",
  ceil_down_mbps: 0,
  ceil_up_mbps: 0,
  price: 0,
  contracts_count: 0,
};

const Formulario = ({ dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    console.log("Render Formulario Planes");
    if (dataToEdit) {
      setForm({ ...dataToEdit });
    } else {
      setForm({ ...initialForm });
    }
  }, [dataToEdit]);

  const validate = Yub.object({
    name: Yub.string().required("Obligatorio"),
  });

  const handleSubmit = (values, actions) => {
    // Aqui debo registrar los datos
    // console.log(values);
    // Si todo sale bien resetear el formulario
    actions.resetForm();

    setDataToEdit(true);
  };

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
          <Input label="Nombre" name="name" type="text" />
          <Input
            label="Max. Subida (Mbps)"
            name="ceil_up_mbps"
            type="number"
            step="1"
            min="1"
            max="100"
          />
          <Input
            label="Max. Descargar (Mbps)"
            name="ceil_down_mbps"
            type="number"
            step="1"
            min="1"
            max="100"
          />
          <Input
            label="Precio (MNX)"
            name="price"
            type="number"
            step="50"
            min="100"
            max="1000"
          />
          <ButtonsForm setDataToEdit={setDataToEdit} dataToEdit={dataToEdit} />
        </div>
      </Form>
    </Formik>
  );
};

export default Formulario;
