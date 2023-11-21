import React from "react";
import style from './balao.module.css'
import { Link } from 'react-router-dom';
import Perfil from "../imagemDePerfil/perfil";
import ElementoCirculo from "./elementoCirculo/elementoCirculo";
import { useContatoEmFoco } from "../../Services/contatoContext";
import { useUser } from "../../Services/userContext";

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
  const { usuarioLogado, setUsuarioLogado } = useUser();

  
  const renderContent = () => {
    switch (tipo) {
      case "chat":
        return (
          <div>
            <Perfil idDoUsuario={perfilID  || 0} />
            <svg width="190" height="75" viewBox="0 0 172 75">
                <g>
                <rect width="169.102439" height="70.266926" rx="35.13" ry="35.13" transform="translate(2.897562 2.366537)" fill="#ffffff"/>
                {(autor !== usuarioLogado.usuarioNome ? 
                <polygon points="0.917372,-14.730946 12.603735,7.27677 -12.603735,7.27677 0.917372,-14.730946" transform="matrix(-.007959-.826668 0.802301-.007725 8.990246 37.47121)" fill="#ffffff"/>
                :
                <polygon points="0.917372,-14.730946 12.603735,7.27677 -12.603735,7.27677 0.917372,-14.730946" transform="matrix(.007959 0.826668-.802301 0.007725 167.110072 37.52879)" fill="#ffffff"/>
                )}
                    <foreignObject x="10" y="-5" width="150" height="75">
                        <p style={{textAlign:"center"}}>{autor} diz: {mensagem}</p>
                    </foreignObject>
                </g>
            </svg>
            <Perfil idDoUsuario={usuarioLogado.usuarioId} />
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
