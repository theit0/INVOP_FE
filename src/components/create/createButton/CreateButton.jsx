
import { CgAdd } from "react-icons/cg";

const CreateButton = ({onClick,entityName}) => {
  return (
    <button className="crear-entity" onClick={onClick}>
        <CgAdd />
        Crear {entityName}
    </button>
  )
}

export default CreateButton