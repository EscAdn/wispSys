import { useEffect, useState } from "react";
import {Formik, Form} from 'formik'
import * as Yub from 'yup'

// Components
import ButtonsForm from "../../extras/ButtonsForm";
import Input from "../../extras/Input";

let initialForm = {
  id: null,
  name: "",
  ceil_down_mbps: 0,
  ceil_up_mbps: 0,
  price: 0,
  contracts_count: 0,
};

const Formulario = ({ createData, updateData, dataToEdit, setDataToEdit }) => {

   // useEffect(() => {
   //  if (dataToEdit) {
   //    initialForm = dataToEdit;
   //  }
   //  console.log("UseEfect", dataToEdit)
   // }, [dataToEdit]);

  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let res = {};

  //   if (
  //     !form.name ||
  //     form.price <= 0 ||
  //     form.ceil_down_mbps <= 0 ||
  //     form.ceil_up_mbps <= 0
  //   ) {
  //     alert("Sin datos...");
  //     return;
  //   }

  //   if (form.id === null) {
  //     res = await createData(form);
  //   } else {
  //     res = await updateData(form);
  //   }

  //   !res && handleReset(e);
  // };

  const validate = Yub.object({
    name: Yub.string().required("Obligatorio")
  })

  const handleSubmit = (values, actions) => {
    // Aqui debo registrar los datos
    console.log(values)
    // Si todo sale bien resetear el formulario
    actions.resetForm()
    
    setDataToEdit({
      id: 19,
      name: "Uchija",
      ceil_down_mbps: 10,
      ceil_up_mbps: 20,
      price: 230,
      contracts_count: 10,
    })
  }

  return (
    <Formik className="col-sm-12" 
      initialValues={initialForm} 
      onSubmit={handleSubmit} 
      onReset={() => {}} 
      validationSchema={validate}>
      <Form className="text-center p-4">
        <h5 className="card-header bg-white">
          <span className="h4 fw-bold">
            {dataToEdit ? "Modificar" : "Registrar"}
          </span>
        </h5>
        <div className="card-body">
          <Input
            label="Nombre"
            name="name"
            type="text"
          />
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
