import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css"
import chatStyle from "./chat.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Input from "../../components/formulario/input/input";
import Perfil from "../../components/imagemDePerfil/perfil";
import { useUser } from "../../Services/userContext";
import { useChat } from "../../Services/chatContext";
import { conectApi } from "../../Services/conectaApi";

function Chat(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const { chat, setChat } = useChat();
    const [destinatario, setDestinatario] = useState("");
    const [chatEmFoco, setChatEmFoco] = useState<{ user: string; user_id: number, hora: string, chat: string}[]>([]);

    useEffect( () => {
        if (!usuarioLogado.usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        }
        const pegaMensagens = async () => { // Função que acessa o BD e retorna as mensagens
            console.log(chat)
            const conversa = await conectApi.recuperaChat(chat);
            setDestinatario((conversa.conexaoConvertida.user_1_id === usuarioLogado.usuarioId ? conversa.conexaoConvertida.user_2_nome : conversa.conexaoConvertida.user_1_nome))
            const mensagens = conversa.conexaoConvertida.content;
            setChatEmFoco(mensagens);
            console.log(mensagens);
        };

        pegaMensagens();
    }, []);

    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Max Chat</h3>
                <div className={style.conversas}>
                    <Modal altura={0}> {/* Quando enviar 0 o componente insere "height: auto" */}
                        <div className={chatStyle.chat_container}>
                            <p className={chatStyle.chat_titulo}>Conversa com: {destinatario}</p>
                            {chatEmFoco && chatEmFoco.map((item, index) =>{
                                return (
                                    <div key={index} className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_income : chatStyle.chat_outcome)}>
                                    <p className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_income_text : chatStyle.chat_outcome_text)}>{item.user} disse as {item.hora}</p>  
                                    <div className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_income_balao : chatStyle.chat_outcome_balao)}>
                                        <Perfil idDoUsuario={item.user_id}/>
                                        <p className={chatStyle.chat_content}>{item.chat}</p>
                                    </div>                              
                                </div>
                                )
                            })}
                        </div>
                        <div  className={chatStyle.chat_submit}>
                            {/* <Input placeholder={"Digite sua mensagem"}/> */}
                            <div className={chatStyle.chat_submit_botao}>
                                <p className={chatStyle.chat_submit_botao_texto}>Enviar mensagem</p>
                            </div>
                        </div>
                    </Modal>
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                <Link to="/menu">
                    <BotaoGrande icon={"fa-solid fa-house"} texto={"Voltar ao Menu"}/>
                </Link>
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

export default Chat;