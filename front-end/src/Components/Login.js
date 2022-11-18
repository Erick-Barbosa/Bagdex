import React, { useState } from "react";
import "./Login.css";
import AuthService from "../Services/AuthService";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const userForm = { username, password };
    if (!username || !password) {
      setMessage("Preencha todos os campos!");
    } else {
      AuthService.login(username, password).then(
        () => {
          console.log("localStorage: " + localStorage.getItem("user"));
          window.location.reload(); // atualiza o localStorage
        },
        (error) => {
          const resMessage =
            (error.response && 
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
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
        <button type="submit">Logar</button>
        <Link className="cancel" to={"/"}>Cancel</Link>
        <div className="msgErro"><strong></strong>{message}</div>
      </form>
    </div>
  );
}