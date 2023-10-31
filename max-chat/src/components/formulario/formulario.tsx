import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./formulario.module.css";
import stdStyle from "../../Common/CSS/conteudo.module.css"
import Input from "./input/input";
import Botao from "../botao/botao";
import validaLogin from "../../Services/validaLogin";
import RegistraUsuario from "../../Services/registraUsuario";
import Modal from "../modal/modal";

function Formulario({ type = "" }: { type?: string }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [emailValido, setEmailValido] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalButton, setModalButton] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoEmail = e.target.value;
    setEmail(novoEmail);
    validarEmail(novoEmail);
  };

  const validarEmail = (email: string) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmailValido(regexEmail.test(email));
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const handleModal = (text: string, corBotao: string) => {
    setModal(true)
    handleModalText(text)
    handleModalButton(corBotao)
  };

  const handleModalOk = () => {
    setModal(false);
    if (modalButton==="verde"){
      window.location.href="/menu"
    }
  }

  const handleModalText = (text: string) => {
    setModalText(text)
  };

  const handleModalButton = (corBotao: string) => {
    setModalButton(corBotao)
  };

  const handleFormSubmit = async () => {
    // Valida o login
    if (emailValido) {
      if (await validaLogin({ email, senha })){
        handleModal('Usuário logado com sucesso!','verde');
      } else {
        handleModal('Dados inválidos! Tente novamente.','vermelho');
      };
    } else {
      handleModal("Email inválido!",'vermelho');
    }
  };

  const handleFormSubmitRegister = async () => {
    // Valida o registro
    if (emailValido) {
      if (email != "" && senha != "" && nome != ""){
        const resultado = await RegistraUsuario({ email, senha, nome })
        if (resultado.resul){
          handleModal(resultado.texto, 'verde');
        } else {
          handleModal(resultado.texto,'vermelho');
        }
      } else {
        handleModal('Preencha todos os campos para registrar um usuário!', 'vermelho');
      }
    } else {
      handleModal("Email inválido!",'vermelho');
    }
  };

  return (
    <div className={type === "" ? style.formulario : style.formulario_medio}>
      
      {modal && <div className={stdStyle.modal_alert}>
        {/* Modal */}
        <Modal altura={0}>
          <div className={stdStyle.modal_alert_content}>
            <p>{modalText}</p>
            <Botao texto ="Ok" cor={modalButton} onClick={handleModalOk}/>
          </div>
        </Modal>
      </div>}
      <p className={style.formulario_texto}>Login:</p>
      <Input placeholder={"Digite seu e-mail"} onChange={handleEmailChange} />
      {!emailValido && <p className={style.alerta_erro} style={{ color: "salmon" }}>Email inválido</p>}
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
