import React from "react";

const Table = () => {
  return (
    <>
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
            <tr>
              <td className="h6">3214</td>
              <td className="h6 fw-bold">Esc Adn</td>
              <td className="h6">2023/01/31</td>
              <td className="h6">$ 350 MNX</td>
              <td className="h6">
                <span className="h6 badge bg-danger">Estado</span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-wisp"
                  onClick={() => {}}
                >
                  <i className="fas fa-dollar"></i>
                </button>
                &nbsp;
                <button
                  className="btn btn-sm btn-outline-wisp"
                  onClick={() => {}}
                >
                  <i className="fas fa-warning"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
