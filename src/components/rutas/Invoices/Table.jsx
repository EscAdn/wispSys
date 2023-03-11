const Table = ({ data }) => {
  console.log(data);
  return (
    <div className="mt-4 col-12 p-2 h-max scroll overflow-auto">
      <div className="card-header bg-white col-12 p-2">
        <h5 className="fw-bold text-center">Facturas Pendientes</h5>
      </div>
      <table className="table table-responsive table-hover shadow p-3 mb-2 bg-body">
        <thead>
          <tr className="bg-personalizado">
            <th scope="col">#</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Estado</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className="text-center">
              <td colSpan="6">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((x) => {
              <tr key={x.id}>
                <td className="h6">{x.id}</td>
                <td className="h6 fw-bold">{x.client}</td>
                <td className="h6">{x.from.substring(0, 10)}</td>
                <td className="h6">$ {x.price} MNX</td>
                <td className="h6">
                  {/* {x.state === "Activa" ? (
                    <span className="h6 badge bg-primary">{x.state}</span>
                  ) : (
                    <span className="h6 badge bg-danger">{x.state}</span>
                  )} */}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-wisp"
                    onClick={() => {}}
                    title="Pagar"
                  >
                    <i className="fas fa-dollar"></i>
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-sm btn-outline-wisp"
                    onClick={() => {}}
                    title="Anular"
                  >
                    <i className="fas fa-warning"></i>
                  </button>
                </td>
              </tr>;
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
