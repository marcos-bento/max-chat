import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css";
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import { useUser } from "../../Services/userContext";
import acessaMensagens from "../../Services/acessaMensagens";
import { useChat } from "../../Services/chatContext";

function Menu(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const { chat, setChat } = useChat();
    const [conversasDoUsuario, setConversasDoUsuario] = useState<{ mensagem: string; autor: string, idDoUsuario: number, idDaConversa: number, destinatario: string, horaMensagem: string }[]>([]);
    
    useEffect( () => {
        if (!usuarioLogado) {
            // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        };
        const pegaMensagens = async () => {
            const mensagens = await acessaMensagens(usuarioLogado.usuarioId, 3);
            setConversasDoUsuario(mensagens);
        };

        pegaMensagens();
    }, []);

    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h2 className={style.titulo}>Seja bem vindo {usuarioLogado && usuarioLogado.usuarioNome}</h2>
                <h3 className={style.titulo}>Últimas conversas:</h3>
                <div className={style.conversas}>
                    {conversasDoUsuario && conversasDoUsuario.map((item, index) =>{
                        return <Link key={index} to="/chat" onClick={() => setChat(item.idDaConversa)}>
                            <p className={style.conversas_destinatario}>Conversa com: {item.destinatario}</p>
                            <Balao key={index} tipo={"chat"} perfilID={item.idDoUsuario} autor={item.autor} mensagem={item.mensagem} hora={item.horaMensagem}/>
                        </Link>
                    })}

                    {conversasDoUsuario.length === 0 && <p className={style.titulo}>você ainda não tem conversas!<br></br>Começe uma já!</p>}
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                <Link to="/conversas">
                    <BotaoGrande icon={"fa-regular fa-comments"} texto={"Ver todas as conversas"}/>
                </Link>
                <Link to="/contatos">
                    <BotaoGrande icon={"fa-solid fa-address-book"} texto={"Ver todos os contatos"}/>
                </Link>
                <Link to="/novoChat">
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
                </Link>
            </section>
            <Rodape />
        </div>
    )
};

export default Menu;