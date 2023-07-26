import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Components
import ButtonsForm from "../../../extras/ButtonsForm";
import Input from "../../../extras/Input";
import Select from "../../../extras/Select";

const initialForm = { 
  id: null, 
  address_id: 0, 
  details: "", 
  ports: 8 
};

const Formulario = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  address,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    console.log("Formulario Nodes")
    if (dataToEdit) {
      setForm({ ...dataToEdit });
    } else {
      setForm({ ...initialForm });
    }
  }, [dataToEdit]);

  const validate = Yup.object({
    address_id: Yup.number().required("Obligatorio"),
    details: Yup.string().required("Obligatorio"),
    ports: Yup.number().required("Obligatorio").min(8, "El valor debe ser 4, 8 o 16")
  });

  const handleSubmit = async (values, actions) => {
    let respuesta = {};

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
          <div className="card-body row g-2">
            <Input
              label="Detalles/Caja/Nodo"
              name="details"
              autoComplete="off"
            />
            <Select
              data={address}
              col="col-md-6"
              label="Nodo/Caja"
              name="address_id"
            />
            <Input
              type="number"
              col="col-md-6"
              label="No. de Puertos"
              name="ports"
              step="8"
              min="8"
              max="16"
              autoComplete="off"
              placeholder="No. de Puertos"
            />
          </div>
          <ButtonsForm dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
        </Form>
      </Formik>
    </>
  );
};

export default Formulario;
