import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ onClick }) => {
  return (
    <button className="btn-accion" onClick={onClick}>
      <FaTrash />
    </button>
  );
};

export default DeleteButton;
