import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';

import ButtonsForm from "./../../extras/ButtonsForm";
import Input from './../../extras/Input.jsx'

const initialForm = {
	id: null,
	name: "",
	// type: ""
}
const Formulario = ({createData, updateData, dataToEdit, setDataToEdit}) => {
	const [form, setForm] = useState(initialForm);

	useEffect(() => {
		if (dataToEdit) {
			setForm({ ...dataToEdit });
		} else {
			setForm({ ...initialForm });
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
		// type: Yup.string().required("Obligatorio"),
		name: Yup.string().required("Obligatorio")
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
			<Form className="text-center px-4 pt-1">
				<h5 className="card-header bg-white">
					<span className="h4 fw-bold">
						{dataToEdit ? "Modificar" : "Registrar"}
					</span>
				</h5>
				<div className="card-body">
					<Input label="Tipo de Pago" name="name" />
					{/*<Input label="Tipo de Pago" name="type" />*/}
				</div>
				<ButtonsForm setDataToEdit={setDataToEdit} dataToEdit={dataToEdit} />
			</Form>
		</Formik>
	)
}

export default Formulario