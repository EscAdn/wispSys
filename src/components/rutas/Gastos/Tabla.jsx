import React from "react";

const Tabla = ({ data }) => {
  return (
    <div className="mt-4 col-12 p-2 h-max scroll overflow-auto">
      <table className="table table-responsive table-hover shadow p-3 mb-5 bg-body">
        <thead>
          <tr className="bg-personalizado">
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Direccíon</th>
            <th scope="col">Registro</th>
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
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.telephpne}</td>
                <td>{e.address_id}</td>
                <td>{e.created_at}</td>
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

export default Tabla;
