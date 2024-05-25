import { FaEdit } from "react-icons/fa";

const EditButton = ({ onClick }) => {
  return (
    <button className="btn-accion" onClick={onClick}>
      <FaEdit />
    </button>
  );
};

export default EditButton;
