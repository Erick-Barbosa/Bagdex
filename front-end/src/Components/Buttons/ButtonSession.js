import { useNavigate } from "react-router-dom";
import "./ButtonSession.css"

export default function ButtonSession(props) {
    const navigate = useNavigate()
    return (
        <div className='login_button' onClick={e => navigate(props.text.toLowerCase())}>{props.text}</div>
    )
}