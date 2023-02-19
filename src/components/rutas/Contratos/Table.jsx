import React from "react";

const Table = ({ data, setDataToEdit, deleteData, generateInvoice }) => {
  return (
    <div className="mt-1 col-12 p-2 h-max scroll overflow-auto">
      <div className="card-header bg-white col-12">
        <h5 className="fw-bold text-center">Contratos</h5>
      </div>
      <p className="text-end">
        Mostrando <b>{data && data.length}</b> registros
      </p>
      <table className="table table-responsive table-hover shadow p-3 mb-2 bg-body">
        <thead>
          <tr className="bg-personalizado">
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Plan</th>
            <th scope="col">Host/Config</th>
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
              <tr key={e.id} className="align-middle">
                <td>{e.public_id}</td>
                <td>
                  <span className="col h6 fw-bold">{e.client}</span>
                  <h5 className="col">
                    <span className="badge text-primary">{e.address}</span>
                  </h5>
                  <span className="col badge text-primary">
                    {e.created_at.substring(0, 10)} -{" "}
                    {e.updated_at.substring(0, 10)}
                  </span>
                </td>
                <td className="text-left">
                  <span className="col fw-bold">{e.plan}</span>
                  <h5 className="col">
                    <span className="badge text-primary">$ {e.price} MNX</span>
                  </h5>
                </td>
                <td className="text-left">
                  <div className="col">
                    <a className="" href={e.ip} target="_blank">
                      {e.ip}
                    </a>
                  </div>
                  <div className="col">{e.mac_address}</div>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-outline-wisp"
                      title="Editar"
                      onClick={() => setDataToEdit(e)}
                    >
                      <i className="fas fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-wisp"
                      title="Ping"
                      onClick={(e) => alert("Ping", e)}
                    >
                      <i className="fas fa-check-double"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-wisp"
                      title="Eliminar"
                      onClick={() => deleteData(e.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-wisp"
                      title="Facturar"
                      onClick={() => generateInvoice(e.id, e.created_invoice)}
                    >
                      <i className="fas fa-file-invoice-dollar"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-wisp"
                      title="Promesa de Pago"
                      onClick={() => alert("Promesa de pago", e.id)}
                    >
                      <i className="fas fa-calendar"></i>
                    </button>
                    {/* <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-wisp"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-caret-down"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item btn">Status</a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item btn"
                            onClick={() => generateInvoice(e)}
                          >
                            Facturar
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item btn">Ping</a>
                        </li>
                        <li>
                          <a className="dropdown-item btn">Promise</a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
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
