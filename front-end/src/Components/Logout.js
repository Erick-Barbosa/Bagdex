import { useEffect } from 'react';
import AuthService from '../Services/AuthService';
import { useNavigate } from "react-router";

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        AuthService.logout();
        navigate("/");
        window.location.reload();
    }, []);
    return 
}