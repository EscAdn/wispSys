// const Modal = ({ titulo, children }) => {
//   return (
//     <div className="modal fade modal-xl" id="exampleModal" tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="staticBackdropLabel">
//               {titulo}
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">{children}</div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-bs-dismiss="modal"
//             >
//               Cerrar
//             </button>
//             <button type="button" className="btn btn-primary">
//               Aceptar
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

const Modal = ({
  children,
  estado,
  cambiarEstado,
  titulo = 'Alerta', 
  mostrarHeader = true
}) => {
  return (
    <>
      {estado && 
        <div className="overlay">
          <div className="contenedorModal">
            {mostrarHeader && 
              <div className="encabezadoModal">
                <h3>{titulo}</h3>
              </div>
            }

            <button className="botonCerrar" onClick={() => cambiarEstado(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>

            {children}
          </div>
        </div>
      }
    </>
  );
}
 
export default Modal;