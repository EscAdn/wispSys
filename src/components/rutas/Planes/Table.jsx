import Message from "../../extras/Message";

const Table = ({ data, setDataToEdit }) => {
  return (
    <div className="mt-1 col-12 p-2 h-max scroll overflow-auto">
      <div className="card-header bg-white col-12">
        <h5 className="fw-bold text-center">Planes</h5>
      </div>
      <table className="table table-responsive table-hover shadow p-3 mb-2 bg-body">
        <thead>
          <tr className="bg-personalizado">
            <th scope="col">Nombre</th>
            <th scope="col">Max. Subida</th>
            <th scope="col">Max. Descarga</th>
            <th scope="col">Precio</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className="text-center">
              <td colSpan="5">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.ceil_up_mbps}</td>
                <td>{e.ceil_down_mbps}</td>
                <td>$ {e.price} MNX</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-wisp"
                    onClick={() => setDataToEdit(e)}
                  >
                    <i className="fas fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
