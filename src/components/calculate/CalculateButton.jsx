import { LuActivitySquare } from "react-icons/lu";

const CalculateButton = ({onClick}) => {
  return (
    <button className="btn-accion" onClick={onClick}>
        <LuActivitySquare/>
    </button>
  )
}

export default CalculateButton