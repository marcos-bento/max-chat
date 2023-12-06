import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css";
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import { useUser } from "../../Services/userContext";
import { useChat } from "../../Services/chatContext";
// Database imports
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../Services/firebase';
import { conectApi } from "../../Services/conectaApi";
import { useContatoEmFoco } from "../../Services/contatoContext";

function Menu() {
    const { usuarioLogado } = useUser();
    const { setChat } = useChat();
    const [conversasDoUsuario, setConversasDoUsuario] = useState<{ lido: boolean, chat: string, user: string, user_id: string, conversa_id: string, deletado: boolean, destinatario: string, destinatario_id: string, data: string, hora: string }[]>([]);
    const { setContatoEmFoco } = useContatoEmFoco();

    useEffect(() => {
        if (usuarioLogado){
            const pegaMensagens = async () => {
                if (usuarioLogado) {
                    const mensagens = await conectApi.recuperaUltimasMensagensPorId(usuarioLogado.usuarioId, 3);
                    setConversasDoUsuario(mensagens);
                };
            };
    
            const unsubscribeChats = onSnapshot(collection(db, 'chats'), (snapshot) => {
                // Chame a função pegaMensagens() sempre que houver uma atualização na coleção 'chats'
                pegaMensagens();
    
                // Acesse a subcoleção 'content' de cada documento
                snapshot.docs.forEach((doc) => {
                    const contentCollection = collection(db, 'chats', doc.id, 'content');
                    const unsubscribeContent = onSnapshot(contentCollection, () => {
                        // Chame a função pegaMensagens() sempre que houver uma atualização na subcoleção 'content'
                        pegaMensagens();
                    });
                });
            });
    
            // Certifique-se de cancelar a inscrição para evitar vazamentos de memória
            return () => {
                unsubscribeChats();
            };
        };
    }, [usuarioLogado]);

    useEffect(() => {
        // Se o usuario não estiver logado, redireciona para "/"
        setContatoEmFoco("");
        if (!usuarioLogado) window.location.href = '/';
    }, []);

    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h2 className={style.titulo}>Seja bem vindo {usuarioLogado && usuarioLogado.usuarioNome}</h2>
                <h3 className={style.titulo}>Últimas conversas:</h3>
                <div className={style.conversas}>
                    {conversasDoUsuario && conversasDoUsuario.length > 0 && conversasDoUsuario.map((item, index) =>{
                        return <Link key={index} to="/chat" onClick={() => setChat(item.conversa_id)}>
                            <p className={style.conversas_destinatario}>Conversa com: {item.destinatario === usuarioLogado.usuarioNome ? item.user : item.destinatario}</p>
                            <Balao ehMensagemNova={item.user_id !== usuarioLogado.usuarioId && !item.lido && true} key={index} tipo={"chat"} perfilID={item.destinatario_id === usuarioLogado.usuarioId ? item.user_id : item.destinatario_id} autor={item.user} mensagem={item.deletado ? "mensagem apagada" : item.chat} dataDaMensagem={item.data} horaDaMensagem={item.hora}/>
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