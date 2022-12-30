import {useForm} from 'react-hook-form'
import { Input, Select } from './Input'

const Formulario = ({title="Registro", data}) => {

    const {register, handleSubmit} = useForm()

    const submitData = (data) => {console.log(data)}

    const cargarInputs = (data) => {
        console.log(data)
        
    }
    
    return (
        <div className="col-sm-12 col-md-4">
			<form onSubmit={handleSubmit(submitData)} className="card text-center p-4">
				<h5 className="card-header bg-white">
					<span className="h3 fw-bold">{title}</span>
				</h5>
                <div className="card-body">
                    {
                        data.map(e => 
                            e.select?
                            <Select key={e.id} register={register} label={e.label} id={e.id} name={e.name} data={e.options} required={e.required}/>
                            :
                            <Input key={e.id} type={e.type?e.type:"text"} register={register} label={e.label} name={e.name} required={e.required} id={e.id} />)
                    }
                </div>
                <button className='btn btn-primary'>Enviar</button>
            </form>
        </div>
    )
}

export default Formulario