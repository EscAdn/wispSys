const Table = () => {

    const titles = [
        {id:"id", titulo: "#", scope: "col"},
        {id:"name", titulo: "Nombre", scope: "col"},
        {id:"options", titulo: "Opciones", scope: "col"},
    ]

    const datos = [
        {id: 123, name: "Rouse Bp"},
        {id: 124, name: "Kim Young"},
    ]

  return (
    <div className="mt-4 col-12 p-2 h-max scroll overflow-auto">
        <table className="table table-responsive table-hover shadow p-3 mb-5 bg-body">
			<thead>
                <tr className="bg-personalizado">
                    {
                        titles.map( e => <th scope={e.scope}>{e.titulo}</th>)
                    }
                    {/* <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Direccíon</th>
                    <th scope="col">Corte</th>
                    <th scope="col">Registro</th>
                    <th scope="col">Opciones</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    datos.map(e => <tr>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>
                            <button id="ver" className="btn btn-sm btn-outline-wisp">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button id="editar" className="btn btn-sm btn-outline-wisp">
                                <i className="fas fa-edit"></i>
                            </button>
					    </td>
                    </tr>)
                }
                {/* <tr>
                    <td>123</td>
                    <td>Mark Dogglas Nikoley</td>
                    <td>9141398454</td>
					<td>Calzada</td>
					<td>15</td>
					<td>12/10/2021</td>
					<td>
						<button id="ver" className="btn btn-sm btn-outline-wisp">
							<i className="fas fa-eye"></i>
						</button>
						<button id="editar" className="btn btn-sm btn-outline-wisp">
							<i className="fas fa-edit"></i>
						</button>
					</td>
                </tr> */}
			</tbody>
		</table>
    </div>
  )
}

export default Table