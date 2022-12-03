import React, { useState } from "react";
import "./PageLogin.css";
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

export default function PageLogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  async function handleSubmit(event) {
    event.preventDefault();
    const userForm = { username, password };
    if (!username || !password) {
      setMessage("Preencha todos os campos!");
    } else {
      await AuthService.login(userForm).then(
        () => {
          console.log("localStorage: " + localStorage.getItem("user"));
          navigate(props.backTo)
          window.location.reload(); // atualiza o localStorage
        },
        (error) => {
          const resMessage =
            (error.response && 
                error.response.data) ||
                error.toString() ||
              error.data.toString();
          setMessage(resMessage);
        }
      );
    }
  }

  return (
    <div className="auth">
      <h2 className="tituloAuth">Login</h2>
      <form className="formLogin" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Digite o usuário"
            className="inputAuth"
            onChange={({ target }) => {
              setUsername(target.value);

              setMessage("");
            }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="Digite a senha"
            className="inputAuth"
            onChange={({ target }) => {
              setPassword(target.value);

              setMessage("");
            }}
          />
        </div>
        <div className="msgErro"><strong></strong>{message}</div>
        <button type="submit">Logar</button>
        <div className="cancel" onClick={e => navigate(props.backTo)}>Cancelar</div>
      </form>
    </div>
  );
}