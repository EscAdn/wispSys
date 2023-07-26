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
};

const Formulario = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    // console.log("Render Formulario Planes");
    if (dataToEdit) {
      setForm({ ...dataToEdit });
    } else {
      setForm({ ...initialForm });
    }
  }, [dataToEdit]);

  const validate = Yub.object({
    name: Yub.string().required("Obligatorio"),
    ceil_down_mbps: Yub.number().required("Obligatorio").min(1, "La velocidad no puede ser 0"),
    ceil_up_mbps: Yub.number().required("Obligatorio").min(1, "El velocidad no puede ser 0"),
    price: Yub.number().required("Obligatorio").min(1, "El precio no puede ser 0"),
  });

  const handleSubmit = async (values, actions) => {
    let respuesta = {}
    // Aqui debo registrar los datos
    if(form.id){
      respuesta = await updateData(values);
    }else{
      respuesta = await createData(values);
    }
    // Si todo sale bien resetear el formulario
    if(!respuesta){
      actions.resetForm();
      setDataToEdit(false);
    }
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
      <Form className="text-center px-4 pt-1">
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
            min="0"
            max="100"
          />
          <Input
            label="Max. Descargar (Mbps)"
            name="ceil_down_mbps"
            type="number"
            step="1"
            min="0"
            max="100"
          />
          <Input
            label="Precio (MNX)"
            name="price"
            type="number"
            step="1"
            min="0"
            max="10000"
          />
          <ButtonsForm setDataToEdit={setDataToEdit} dataToEdit={dataToEdit} />
        </div>
      </Form>
    </Formik>
  );
};

export default Formulario;
