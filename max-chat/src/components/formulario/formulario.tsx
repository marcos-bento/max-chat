import React, { useState } from "react";
import style from "./formulario.module.css";
import stdStyle from "../../Common/CSS/conteudo.module.css"
import Input from "./input/input";
import Botao from "../botao/botao";
import Modal from "../modal/modal";
import { useUser } from "../../Services/userContext";
import { UsuarioLogado } from "../../Services/usuarioLogado";
import { Link, useInRouterContext } from "react-router-dom";
// Database imports
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../Services/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { conectApi } from "../../Services/conectaApi";
import { Usuario } from "../../Interfaces/user";
import Icone from "../icone/icone";

// ################

function Formulario({type = "" }: { type?: string }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [emailValido, setEmailValido] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalButton, setModalButton] = useState("");
  const { usuarioLogado, setUsuarioLogado } = useUser();
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Função que atualiza o valor digitado no e-mail
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoEmail = e.target.value;
    setEmail(novoEmail);
    validarEmail(novoEmail);
  };

  // Função que valida o e-mail por uma RegExp (consultada na internet)
  const validarEmail = (email: string) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmailValido(regexEmail.test(email));
  };

  // Função que atualiza o valor digitado no campo nome
  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  // Função que atualiza o valor digitado no campo senha
  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  // Função que gerencia o Modal
  const handleModal = (text: string, corBotao: string) => {
    setModal(true)
    setModalText(text)
    setModalButton(corBotao)
  };

  // Atualiza o estado com os dados do LOGIN:
  const criaEstadoLogado = async (user_id: string) =>{
    try {
      const id = await conectApi.recuperaIDPorCampoUserID(user_id); // Recupera a Primary Key
      if (!id){
        handleModal(`Erro de acesso ao servidor!`, "vermelho");
        return;
      };

      const usuario = await conectApi.recuperaUsuarioPorID(id);
      if (!usuario){
        handleModal(`Erro de acesso ao servidor!`, "vermelho");
        return;
      };

      setUsuarioLogado(new UsuarioLogado(id, usuario.nome, usuario.email, (usuario.imagem || usuario.gravatar && "gravatar" || "")));
      
    } catch (e) {
      handleModal(`Erro de acesso ao servidor: ${e}`, "vermelho");
    };
  };
  
  // Valida o login (FIREBASE)
  const fazerLogin = async (event: Event) => {
    setCarregando(true);
    event.preventDefault();
    if (emailValido) {
      await signInWithEmailAndPassword(auth, email, senha).then((userCredencial)=>{
        criaEstadoLogado(userCredencial.user.uid);
        setCarregando(false);
        handleModal('Usuário logado com sucesso!','verde');
        setLogado(true);
      })
      .catch ((error)=>{
        setCarregando(false);
        handleModal(`Erro ao fazer login: ${error.code}`,'vermelho');
      });
    } else {
      setCarregando(false);
      handleModal("Email inválido!",'vermelho');
    };
    
  };

  // Valida o registro (FIREBASE)
  const cadastrarUsuario = async () => {
    setCarregando(true);
    if (emailValido) {
      if (email !== "" && senha !== "" && nome !== ""){ 
        try {
          // Primeiro registro acesso ao usuário (apenas login e senha) no BD;
          await createUserWithEmailAndPassword(auth, email, senha)

          // Depois realizo login com os dados do usuário;
          const userCredencial = await signInWithEmailAndPassword(auth, email, senha)

          // Por fim, registro usuário no BD;
          const dadosUsuario: Usuario = {
            nome: nome,
            email: email,
            imagem: "",
            gravatar: false,
            id: userCredencial.user.uid
          };

          const resul = await conectApi.registraUsuario(dadosUsuario);
          setLogado(true);
          setCarregando(false);
          handleModal(resul, 'verde');
          await criaEstadoLogado(userCredencial.user.uid);

        } catch (error) {
          setCarregando(false);
          handleModal(`Erro ao cadastrar usuário: ${error}`, 'vermelho');
        };
      } else {
        setCarregando(false);
        handleModal('Preencha todos os campos para registrar um usuário!', 'vermelho');
      };
    } else {
      setCarregando(false);
      handleModal("Email inválido!",'vermelho');
    };
  };

  return (
    <div className={type === "" ? style.formulario : style.formulario_medio}>

      {carregando && <div className={stdStyle.modal_alert}>
        {/* Modal */}
        <Modal altura={0}>
          <div className={stdStyle.modal_alert_content}>
            <p>Por favor aguarde! Carregando!</p>
            <div className={stdStyle.modal_alert_content_loading}>
              <Icone icon={"fa-solid fa-spinner"}/>
            </div>
          </div>
        </Modal>
      </div>}

      {modal && <div className={stdStyle.modal_alert}>
        {/* Modal */}
        <Modal altura={0}>
          <div className={stdStyle.modal_alert_content}>
            <p>{modalText}</p>
            {logado ?
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
      <Input placeholder={"Digite seu e-mail"} onChange={handleEmailChange}/>
      {!emailValido && <p className={style.alerta_erro} style={{ color: "salmon" }}>Email inválido</p>}
      <p className={style.formulario_texto}>Senha:</p>
      <Input placeholder={"Digite sua senha"} type={"password"} onChange={handleSenhaChange}/>
      {type === "" ? null : (
        <>
          <p className={style.formulario_texto}>Nome:</p>
          <Input placeholder={"Digite seu nome"} onChange={handleNomeChange}/>
        </>
      )}
      <Botao texto={type === "" ? "Entrar" : "Registrar"} onClick={type === "" ? fazerLogin : cadastrarUsuario}/>
    </div>
  );
}

export default Formulario;
