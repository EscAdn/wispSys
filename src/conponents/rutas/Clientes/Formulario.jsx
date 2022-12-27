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
				<Input complete="off" label="Nombre" name="nombre" register={register} type="text" required id="floatingNombre"/>
				{/* Direccion */}
				<Input complete="off" label="Apellido(s)" name="apellido" register={register} type="text" required id="floatingApellido"/>
				{/* Telefono */}
				<Input complete="off" label="Telefono" name="telefono" register={register} type="text" id="floatingTelefono"/>
				{/* Direccion */}
				<Select id="floatingDireccion" label="Direccion" name="direccion" register={register} data={direccion} required/>
				{/* Button */}
				<div className="d-flex justify-content-evenly">
					<button type="submit" className='btn btn-wisp'>Enviar</button>
					<button type="submit" className='btn btn-wisp'>Limpiar</button>
				</div>
			</form>
		</div>
	);
}