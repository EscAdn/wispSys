const Tabla = ({data, setDataToEdit}) => {
	return (
		<>
			<div className="card-header bg-white col-12">
				<h5 className="fw-bold text-center">Formas de Pago</h5>
			</div>
			<p className="text-end mb-0">
			Mostrando <b>{data && data.length}</b> resultados
			</p>
			<div className="mt-0 col-12 px-2 h-max scroll overflow-auto">
				<table className="table table-responsive table-hover shadow p-3 mb-2 bg-body">
					<thead>
						<tr className="bg-personalizado">
							<th scope="col">Forma de pago</th>
							<th scope="col">Opciones</th>
						</tr>
					</thead>
					<tbody>
					{!data.length > 0 && (<tr><td colSpan="2">No hay datos registrados...</td></tr>)}
					{data.map((e) => (
						<tr key={e.id}>
							<td>{e.name}</td>
							<td>
								<button className="btn btn-sm btn-outline-wisp" 
								onClick={() => setDataToEdit(e)}>
									<i className="fas fa-pen-to-square"></i>
								</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Tabla