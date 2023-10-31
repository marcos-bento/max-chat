import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./formulario.module.css";
import Input from "./input/input";
import Botao from "../botao/botao";
import validaLogin from "../../Services/validaLogin";
import RegistraUsuario from "../../Services/registraUsuario";

function Formulario({ type = "" }: { type?: string }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState(""); // Se você quiser rastrear o nome, se aplicável

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleFormSubmit = async () => {
    // Valida o login
    if (await validaLogin({ email, senha })){
        alert('Usuário logado com sucesso!');
        window.location.href="/menu"
    } else {
        alert('Dados inválidos! Tente novamente.');
    };
  };

  const handleFormSubmitRegister = async () => {
    // Valida o registro
    if (email != "" && senha != "" && nome != ""){
      const resultado = await RegistraUsuario({ email, senha, nome })
      alert(resultado.texto);
      if (resultado.resul){
        window.location.href="/menu"
      }
    } else {
      alert('Preencha todos os campos para registrar um usuário!')
    }
 
  };

  return (
    <div className={type === "" ? style.formulario : style.formulario_medio}>
      <p className={style.formulario_texto}>Login:</p>
      <Input placeholder={"Digite seu e-mail"} onChange={handleEmailChange} />
      <p className={style.formulario_texto}>Senha:</p>
      <Input placeholder={"Digite sua senha"} type={"password"} onChange={handleSenhaChange}/>
      {type === "" ? null : (
        <>
          <p className={style.formulario_texto}>Nome:</p>
          <Input placeholder={"Digite seu nome"} onChange={handleNomeChange}/>
        </>
      )}

      <Botao texto={type === "" ? "Entrar" : "Registrar"} onClick={type === "" ? handleFormSubmit : handleFormSubmitRegister}/>
    </div>
  );
}

export default Formulario;
