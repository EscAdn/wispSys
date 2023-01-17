import React from "react";

export const TablaAddress = ({ data, setDataToEdit, deleteData, er }) => {
  return (
    <>
      <div className="mt-4 col-12 p-2 h-max scroll overflow-auto">
        <h5 className="card-header bg-white">
          <span className="h3 fw-bold">Direcciones</span>
        </h5>
        <table className="table table-responsive table-hover shadow p-3 mb-5 bg-body">
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
                  <td>{e.address}</td>
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
      </div>
    </>
  );
};
