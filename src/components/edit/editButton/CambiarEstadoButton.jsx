import { LuPackagePlus } from "react-icons/lu";


const CambiarEstadoButton = ({onClick}) => {
  return (
    <button className="btn-accion" onClick={onClick}>
        <LuPackagePlus/>
    </button>
  )
}

export default CambiarEstadoButton