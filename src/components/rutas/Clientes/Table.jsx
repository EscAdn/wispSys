const Table = ({ data, setDataToEdit, deleteData }) => {
  return (
    <>
      <div className="card-header bg-white col-12">
        <h5 className="fw-bold text-center">Clientes</h5>
      </div>
      <p className="text-end">
        Mostrando <b>{data && data.length}</b> Clientes
      </p>
      <div className="mt-0 col-12 p-2 h-max scroll overflow-auto">
        <table className="table table-responsive table-hover shadow p-3 mb-2 bg-body">
          <thead>
            <tr className="bg-personalizado">
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Dirección/Zona</th>
              <th scope="col">Registro</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.id}>
                <td className="h6">{e.id}</td>
                <td className="h6 fw-bold">{e.name}</td>
                <td className="h6">{e.telephone}</td>
                <td className="h6">{e.address}</td>
                <td className="h6 text-primary">
                  {e.created_at.substring(0, 10)}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-wisp"
                    onClick={() => setDataToEdit(e)}
                  >
                    <i className="fas fa-pen-to-square"></i>
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-sm btn-outline-wisp"
                    onClick={() => deleteData(e.id)}
                  >
                    <i className="fas fa-close"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
