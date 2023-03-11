const Table = ({ data, setDataToEdit }) => {
  return (
    <div className="mt-4 col-12 p-2 h-max scroll overflow-auto">
      <table className="table table-responsive table-hover shadow p-3 mb-3 bg-body">
        <thead>
          <tr className="bg-personalizado">
            <th scope="col">Fecha</th>
            <th scope="col">E/S</th>
            <th scope="col">Cliente</th>
            <th scope="col">Ingreso</th>
            <th scope="col">Egreso</th>
            <th scope="col">Concepto</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id}>
              <td>{e.created_at.substring(0, 10)}</td>
              <td>{e.pt_name}</td>
              <td>{e.client_name}</td>
              <td>{e.amount_incomes}</td>
              <td>{e.amount_discharge}</td>
              <td>{e.concept}</td>
              <td>
                <button
                  id="editar"
                  className="btn btn-sm btn-outline-wisp"
                  onClick={() => setDataToEdit(e)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
