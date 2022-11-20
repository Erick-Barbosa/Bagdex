import { Link } from "react-router-dom";

export default function LoginLogoutButton(props) {
    return (
        <div ><Link to={(props.text).toLowerCase()} className='login_button'>{props.text}</Link></div>
    )
}