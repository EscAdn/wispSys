import { useState, useEffect } from "react";

export const useFormulario = ({
  initialForm,
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataToEdit) {
      setForm({ ...dataToEdit });
    } else {
      setForm({ ...initialForm });
    }
    console.log(form, initialForm);
  }, [dataToEdit]);

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    let respuesta = {};
    console.log(values);

    // if (values.id) {
    //   respuesta = await updateData(values);
    // } else {
    //   respuesta = await createData(values);
    // }
    // // Si todo sale bien resetear el formulario
    // if (!respuesta) {
    //   actions.resetForm();
    //   setDataToEdit(false);
    // }
    setLoading(false);
  };

  return {
    form,
    loading,
    handleSubmit,
    dataToEdit,
    setDataToEdit,
  };
};
