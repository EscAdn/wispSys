
export const Input = ({type="text", register, complete="off", label, name, required, id}) => {
  return (
    <div className="form-floating mb-3">
		<input type={type} {...register(name, { required })} className="form-control" autoComplete={complete} id={id} placeholder={label}/>
		<label htmlFor={id}>{label}</label>
	</div>
  )
}

export const Select = ({register, label, id, name, data, required}) => {

  return (
    <div className="form-floating mb-3">
      <select {...register(name, {required})} className="form-select" id={id} >
        <option defaultValue value="0">Seleccione...</option>
        {
          data.map(e => <option key={e.id} value={e.id}>{e.name}</option>)
        }
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}