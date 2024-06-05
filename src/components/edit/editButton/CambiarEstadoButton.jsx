import { LuPackagePlus } from "react-icons/lu";

const CambiarEstadoButton = ({ onClick, disabled }) => {
  return (
    <button className="btn-accion" onClick={onClick} disabled={disabled}>
      <LuPackagePlus />
    </button>
  );
};

export default CambiarEstadoButton;
