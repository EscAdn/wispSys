const Table = ({ data }) => {
  const pagarFactura = (data) => {
    alert("Pagar Factura " + data.id);
  };

  const anularFactura = (id) => {
    alert("Anular Factura " + id);
  };

  return (
    <>
      <div className="card-header bg-white col-12 p-2">
        <h5 className="fw-bold text-center">Facturas Pendientes</h5>
      </div>
      <div className="mt-1 col-12 p-2 h-max scroll overflow-auto">
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
            {data.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td className="h6 fw-bold">{e.client}</td>
                <td>{e.from.substring(0, 10)}</td>
                <td>$ {e.price} MNX</td>
                <td>
                  {e.state === "Activa" ? (
                    <span className="h6 badge bg-primary">{e.state}</span>
                  ) : (
                    <span className="h6 badge bg-danger">{e.state}</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-wisp"
                    onClick={() => pagarFactura(e)}
                    title="Pagar"
                  >
                    <i className="fas fa-dollar"></i>
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-sm btn-outline-wisp"
                    onClick={() => anularFactura(e.id)}
                    title="Anular"
                  >
                    <i className="fas fa-warning"></i>
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
