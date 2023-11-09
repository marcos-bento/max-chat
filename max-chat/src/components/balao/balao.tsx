import React from "react";
import style from './balao.module.css'
import { Link } from 'react-router-dom';
import Perfil from "../imagemDePerfil/perfil";
import ElementoCirculo from "./elementoCirculo/elementoCirculo";
import { useContatoEmFoco } from "../../Services/contatoContext";

interface BalaoProps {
  tipo: "chat" | "contato" | "botao";
  icone?: string;
  cor?: string;
  texto?: string;
  perfilID?: number;
  autor?: string;
  mensagem?: string;
  nomeDoContato?: string;
  emailDoContato?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Balao({ tipo, icone="fa-solid fa-plus", cor="verde", texto="Novo Contato", perfilID ,autor, mensagem, nomeDoContato, emailDoContato, onClick }: BalaoProps) {
  const { contatoEmFoco, setContatoEmFoco } = useContatoEmFoco();
  
  const renderContent = () => {
    switch (tipo) {
      case "chat":
        return (
          <div>
            <Perfil idDoUsuario={perfilID  || 0} />
            <svg width="238" height="65" viewBox="0 0 238 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M16 32.5C16 14.5507 30.5507 0 48.5 0H205.5C223.449 0 238 14.5507 238 32.5C238 50.4493 223.449 65 205.5 65H48.5C30.5507 65 16 50.4493 16 32.5Z" fill="#FFFFFF"/>
                    <path d="M29.8564 19L29.8564 46.7128L5.85641 32.8564L29.8564 19Z" fill="#FFFFFF"/>
                    <foreignObject x="30" y="-5" width="187" height="75">
                        <p>{autor} diz: {mensagem}</p>
                    </foreignObject>
                </g>
            </svg>
          </div>
        );

      case "contato":
        
        return (
          <>
            <div className={style.botao_container}>
                <Perfil emailDoUsuario={emailDoContato}/>
                <p>{nomeDoContato}</p>
            </div>
            <div className={style.botao_container}>
              <Link to="/editarContato" onClick={() =>setContatoEmFoco(emailDoContato)}>
                <ElementoCirculo icon={"fa-solid fa-pen-to-square"} cor={"azul"}/>
                <p>Editar</p>
              </Link>
            </div>
            <div className={style.botao_container}>
              <Link to="/novochat" onClick={() =>setContatoEmFoco(emailDoContato)}>
                <ElementoCirculo icon={"fa-solid fa-comment-dots"} cor={"verde"}/>
                <p>Chat</p>
              </Link>
            </div>
          </>
        );

      case "botao":
        return (
          <div onClick={onClick}>
            <ElementoCirculo icon={icone} cor={cor}/>
            <p className={style.texto_botao}>{texto}</p>
          </div>
        );
    }
  };

  return (
    <div className={style.balao}>
      {renderContent()}
    </div>
  );
}

export default Balao;
