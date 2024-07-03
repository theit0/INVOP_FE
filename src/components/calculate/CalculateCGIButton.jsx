import { FaCalculator } from "react-icons/fa6";


const CalculateCGIButton = ({onClick}) => {
  return (
    <button className="btn-accion" onClick={onClick}>
        <FaCalculator />
    </button>
  )
}

export default CalculateCGIButton