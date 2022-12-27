import { Header } from "../extras/Header";
import Formulario from "./Inicio/Formulario";
import Tabla from "./Inicio/Tabla";


export const Inicio = () => {
  return (
    <>
      <Header title="Inicio" />
      <hr />
      <div className="row contenido justify-content-between">
        <Formulario />
        <Tabla />
      </div>
      
    </>
  );
};
