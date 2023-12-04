import React, { useEffect, useRef } from "react";
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
  perfilID?: string;
  autor?: string;
  mensagem?: string;
  nomeDoContato?: string;
  emailDoContato?: string;
  horaDaMensagem?: string;
  dataDaMensagem?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Balao({ tipo, icone="fa-solid fa-plus", cor="verde", texto="Novo Contato", perfilID ,autor, mensagem, nomeDoContato, emailDoContato, onClick , horaDaMensagem="00:00", dataDaMensagem=""}: BalaoProps) {
  const { contatoEmFoco, setContatoEmFoco } = useContatoEmFoco();
  const { usuarioLogado, setUsuarioLogado } = useUser();

  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const dy = calculateDy();
    if (textRef.current && dy){
      textRef.current.style.transform = `translateY(${dy}px)`;
    }
  }, [textRef]);

  // Função que calcula a altura para exibir a prévia de texto
  const calculateDy = () => {
    const dy = (75 / 2 - 40);
    return dy;
  };

  // Função que valida quando a mensagem foi enviada para retornar "hoje", "ontem" ou "dd/mm"
  const validaData = (data: string) => {
    const dataMensagem = new Date(data);
    const hoje = new Date();
    const ontem = new Date(hoje);

    ontem.setDate(hoje.getDate() - 1);

    // Ajusta para a mesma hora, minutos, segundos e milissegundos
    hoje.setUTCHours(0, 0, 0, 0);
    ontem.setUTCHours(0, 0, 0, 0);
    dataMensagem.setUTCHours(0, 0, 0, 0);

    if (dataMensagem.getTime() === hoje.getTime()) {
        return 'hoje';
    } else if (dataMensagem.getTime() === ontem.getTime()) {
        return 'ontem';
    } else {
        const dd = String(dataMensagem.getDate()).padStart(2, '0');
        const mm = String(dataMensagem.getMonth() + 1).padStart(2, '0');
        return `${dd}/${mm}`;
    }
  };    
  
  const renderContent = () => {
    switch (tipo) {
      case "chat":
        return (
          <div className={style.chat_container}>
            <Perfil idDoUsuario={perfilID  || ""} />
            <svg className={style.chat_container_svg} width="190" height="75" viewBox="0 0 172 75">
              <g>
                <rect width="169.102439" height="70.266926" rx="35.13" ry="35.13" transform="translate(2.897562 2.366537)" fill="#ffffff"/>
                {(autor !== usuarioLogado.usuarioNome 
                // Se for o destinatario que falou, exibe balao com "conversa pra esquerda"
                ? <polygon points="0.917372,-14.730946 12.603735,7.27677 -12.603735,7.27677 0.917372,-14.730946" transform="matrix(-.007959-.826668 0.802301-.007725 8.990246 37.47121)" fill="#ffffff"/>
                // Se for o destinatario que falou, exibe balao com "conversa pra direita"
                : <polygon points="0.917372,-14.730946 12.603735,7.27677 -12.603735,7.27677 0.917372,-14.730946" transform="matrix(.007959 0.826668-.802301 0.007725 167.110072 37.52879)" fill="#ffffff"/>)}
                <foreignObject className={style.chat_container_foreign} x="10" y="-5" width="150" height="75">
                  <p className={style.chat_container_foreign_text_1}>{autor} diz: </p>
                  <p ref={textRef} className={style.chat_container_foreign_text_2}>{mensagem}</p>
                  <p className={style.chat_container_foreign_text_3}>{validaData(dataDaMensagem)} às: {horaDaMensagem}</p>
                </foreignObject>
              </g>
            </svg>
            <Perfil idDoUsuario={usuarioLogado.usuarioId} />
          </div>
        );

      case "contato":
        
        return (
          <>
            <div className={`${style.botao_container}`}>
                <Perfil emailDoUsuario={emailDoContato}/>
                <p className={style.botao_container_nome_contato}>{nomeDoContato}</p>
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
