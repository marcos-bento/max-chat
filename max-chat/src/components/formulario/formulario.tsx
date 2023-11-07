import React, { useState } from "react";
import style from "./formulario.module.css";
import stdStyle from "../../Common/CSS/conteudo.module.css"
import Input from "./input/input";
import Botao from "../botao/botao";
import validaLogin from "../../Services/validaLogin";
import RegistraUsuario from "../../Services/registraUsuario";
import Modal from "../modal/modal";
import { useUser } from "../../Services/userContext";
import { UsuarioLogado } from "../../Services/usuarioLogado";
import { Link } from "react-router-dom";
import { conectApi } from "../../Services/conectaApi";


function Formulario({type = "" }: { type?: string }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [emailValido, setEmailValido] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalButton, setModalButton] = useState("");
  const { usuarioLogado, setUsuarioLogado } = useUser(); // Use o contexto aqui


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
    setModalText(text)
    setModalButton(corBotao)
  };
  
  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();
    // Valida o login
    if (emailValido) {
      let resposta = await validaLogin({ email, senha })
      if (resposta.response){
        setUsuarioLogado(new UsuarioLogado(resposta.id, resposta.nome))
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
      if (email !== "" && senha !== "" && nome !== ""){
        const resultado = await RegistraUsuario({ email, senha, nome, imagem:"", contatos:[] })
        if (resultado.resul){
          setUsuarioLogado(new UsuarioLogado(resultado.id, nome))
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
            {usuarioLogado && usuarioLogado.usuarioLogado ?
              // Caso o Login dê certo:
              <Link to="/menu">
                <Botao texto ="Ok" cor={modalButton} />
              </Link> : 
              // Caso o Login dê errado:
              <Botao texto ="Ok" cor={modalButton} onClick={() => {setModal(false)}}/>
            }
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
