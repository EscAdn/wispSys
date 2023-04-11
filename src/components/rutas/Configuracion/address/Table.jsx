const Table = ({ data, setDataToEdit }) => {
  console.log("Table Add..");
  return (
    <>
      <div className="card-header bg-white col-12">
        <h5 className="fw-bold text-center">Direcciones</h5>
      </div>
      <table className="table table-hover shadow p-3 mb-2 bg-body">
        <thead>
          <tr className="bg-personalizado">
            <th scope="col">#</th>
            <th scope="col">Dirección/Zona</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-wisp"
                  onClick={() => setDataToEdit(e)}
                >
                  <i className="fas fa-pen-to-square"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
