import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css";
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import { useUser } from "../../Services/userContext";
import { useChat } from "../../Services/chatContext";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../Services/firebase';
import { conectApi } from "../../Services/conectaApi";

function Conversas() {
    const { usuarioLogado } = useUser();
    const { setChat } = useChat();
    const [conversasDoUsuario, setConversasDoUsuario] = useState<{ chat: string, user: string, user_id: string, conversa_id: string, deletado: boolean, destinatario: string, destinatario_id: string, data: string, hora: string }[]>([]);

    useEffect(() => {
        const pegaMensagens = async () => {
            if (usuarioLogado) {
                const mensagens = await conectApi.recuperaUltimasMensagensPorId(usuarioLogado.usuarioId, 3);
                setConversasDoUsuario(mensagens);
            }
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
    }, [usuarioLogado]);

    return (
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Todas conversas</h3>
                <div className={style.conversas}>
                    {conversasDoUsuario && conversasDoUsuario.map((item, index) => {
                        return <Link key={index} to="/chat" onClick={() => setChat(item.conversa_id)}>
                            <p className={style.conversas_destinatario}>Conversa com: {item.destinatario === usuarioLogado.usuarioNome ? item.user : item.destinatario}</p>
                            <Balao key={index} tipo={"chat"} perfilID={item.destinatario_id === usuarioLogado.usuarioId ? item.user_id : item.destinatario_id} autor={item.user} mensagem={item.deletado ? "mensagem apagada" : item.chat} dataDaMensagem={item.data} horaDaMensagem={item.hora} />
                        </Link>
                    })}
                    {conversasDoUsuario.length === 0 && <p className={style.titulo}>você ainda não tem conversas!<br></br>Começe uma já!</p>}
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                <Link to="/menu">
                    <BotaoGrande icon={"fa-solid fa-house"} texto={"Voltar ao Menu"} />
                </Link>
                <Link to="/contatos">
                    <BotaoGrande icon={"fa-solid fa-address-book"} texto={"Ver todos os contatos"} />
                </Link>
                <Link to="/novoChat">
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"} />
                </Link>
            </section>
            <Rodape />
        </div>
    );
}

export default Conversas;
