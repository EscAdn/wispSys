import React from 'react';
import {useForm} from 'react-hook-form'
import {Input, Select} from '../../extras/Input';

export const Formulario = () => {

	const {register, handleSubmit} = useForm()

	const registrarDatos = (data) => {
		console.log(data)
	}

	const direccion = [
		{
			id: 1,
			name: "Calzada" 
		},
		{
			id: 2,
			name: "Mantilla" 
		},
		{
			id: 3,
			name: "5 de Mayo" 
		}
	]

	return(
		<div className='card p-2'>
			<p className='text-center h5 fw-bold'>Registro</p>
			<form className="p-2" onSubmit={handleSubmit(registrarDatos)}>
				{/* Nombre completo */}
				<Input complete="off" label="Nombre Completo" name="nombre" register={register} type="text" required id="floatingNombre"/>
				{/* Telefono */}
				<Input complete="off" label="Telefono" name="telefono" register={register} type="text" id="floatingTelefono"/>
				{/* Direccion */}
				<Select id="floatingDireccion" label="Direccion" name="direccion" register={register} data={direccion} required/>
				{/* Telefono */}
				<Input complete="off" label="Instalacion" name="fecha_registro" register={register} type="date" id="floatingInstaacion"/>
				{/* Button */}
				<div className="d-flex justify-content-evenly">
					<button type="submit" className='btn btn-wisp'>Enviar</button>
					<a type="submit" className='btn btn-wisp'>Limpiar</a>
				</div>
			</form>
		</div>
	);
}