import { useNavigate } from "react-router-dom";
import "./ButtonBack.css"

export default function ButtonBack() {
    const navigate = useNavigate()
    return (
        <div className='back_button' onClick={e => navigate("/")}>Voltar</div>
    )
}