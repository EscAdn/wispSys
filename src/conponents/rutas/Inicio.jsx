import { Header } from "../extras/Header";
import Formulario from './../extras/useFormulario'

export const Inicio = () => {

  const inputs = [
    {label: "Nombre", name: "nombre", required: true, id: "floatingName"},
    {label: "Edad", name: "edad", required: true, id: "floatingAge"},
    {select:true, label: "Direccion", name: "direccion", required: true, id: "floatingAdress", 
    options: [{id: 1, name: "Mantila"}, {id: 2, name: "Calzada"}]},
  ]

  return (
    <>
      <Header title="Inicio" />
      <div className="row contenido justify-content-between">
        <Formulario data={inputs} />
        {/* <Tabla /> */}
      </div>
      
    </>
  );
};
