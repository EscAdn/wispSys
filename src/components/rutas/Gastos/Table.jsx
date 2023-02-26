import React from "react";

const Table = ({ data }) => {
  return (
    <div className="mt-4 col-12 p-2 h-max scroll overflow-auto">
      <table className="table table-responsive table-hover shadow p-3 mb-3 bg-body">
        <thead>
          <tr className="bg-personalizado">
            <th scope="col">Fecha</th>
            <th scope="col">Cliente</th>
            <th scope="col">Ingreso</th>
            <th scope="col">Egreso</th>
            <th scope="col">Concepto</th>
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
            data.map((e) => (
              <tr key={e.id}>
                <td>{e.created_at.substring(0, 10)}</td>
                <td>{e.client_name}</td>
                <td>{e.amount_incomes}</td>
                <td>{e.amount_discharge}</td>
                <td>{e.concept}</td>
                <td>
                  <button id="ver" className="btn btn-sm btn-outline-wisp">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button id="editar" className="btn btn-sm btn-outline-wisp">
                    <i className="fas fa-edit"></i>
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
