import React from "react";

const Table = ({ data, setDataToEdit, deleteData }) => {
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
          {data.length === 0 ? (
            <tr className="text-center">
              <td colSpan="4">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((e) => (
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
                  <button
                    className="btn btn-sm btn-outline-wisp"
                    onClick={() => deleteData(e.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
