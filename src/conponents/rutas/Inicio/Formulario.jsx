import {useForm} from "react-hook-form"

const Formulario = () => {

    const {register, handleSubmit } = useForm()
 
    const onSubmit = (data) => {
        // event.preventDefault()
        console.log(data)
    }
    
    return (
    <>
        <form className="card p-2 col-5" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Nombre" name="nombre" type="text" register={register} required />
            <Input label="Apellido" name="apellido" type="text" register={register} required />
            <Input label="Direccion" name="direccion" type="text" register={register} required />
            <div className="col-md-3">
                <button 
                className="btn btn-primary"
                type="submit"
                >Enviar</button>
            </div>
        </form>
    </>
  )
}

const Input = ({register, type, name, label, required}) => {
    return (
        <div className="col-md-12">
            <input 
                name={name}
                className="form-control"
                type={type} 
                placeholder={label}
                {...register(name, { required })}
                />
        </div>
    )
}

export default Formulario
