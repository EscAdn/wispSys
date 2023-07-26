import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Components
import ButtonsForm from "../../../extras/ButtonsForm";
import Input from "../../../extras/Input";

const initialForm = { id: null, name: "" };

const Formulario = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    console.log("Formulario Addresses")
    if (dataToEdit) {
      setForm({ ...dataToEdit });
    } else {
      setForm({ ...initialForm });
    }
  }, [dataToEdit]);

  const validate = Yup.object({
    name: Yup.string().required("Obligatorio")
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
    <>
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
            <span className="h5 fw-bold">
              {dataToEdit ? "Modificar" : "Registrar"}
            </span>
          </h5>
          <div className="card-body">
            <Input
              label="Dirección/Zona"
              name="name"
              type="text"
            />
          </div>
          <ButtonsForm dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
        </Form>
      </Formik>
    </>
  );
};

export default Formulario;
