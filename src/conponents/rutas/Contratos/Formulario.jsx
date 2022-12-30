import {useForm} from 'react-hook-form'
import {Input, Select} from './../../extras/Input'

const Formulario = () => {

    const {register, handleSubmit} = useForm()

    const registrarDatos = (data) => {
        console.log(data)
    }

  return (
    <div className='card p-2'>
        <p className='text-center h5 fw-bold'>Registro</p>
		<form className="p-2" onSubmit={handleSubmit(registrarDatos)}>
            <Input complete="off" label="Cliente" name="cliente" register={register} type="text" required id="floatingCliente"  />
            <Input complete="off" label="Direccion IP" name="ip" register={register} type="text" required id="floatingIp"  />
            <Input complete="off" label="Direccion Mac" name="mac" register={register} type="text" id="floatingMac"  />
            <Input complete="off" label="Numero de Serie" name="serie" register={register} type="text" id="floatingSerie"  />
            <Input complete="off" label="Corte" name="corte" register={register} type="number" required id="floatingCorte"  />
            <Input complete="off" label="Detalles" name="details" register={register} type="text" required id="floatingDetails"  />
            <Input complete="off" label="Registro/Instalacion" name="fecha_registro" register={register} type="date" required id="floatingFecha"  />
        </form>
    </div>
  )
}

export default Formulario