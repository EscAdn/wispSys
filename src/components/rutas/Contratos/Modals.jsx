import Input from "../../extras/Input";
import Modal from "../../extras/Modal";

const Modals = () => {
  return (
    <Modal titulo="Generar Factura">
      <Input label="Fechas del Periodo" type="date" />
    </Modal>
  );
};

export default Modals;
