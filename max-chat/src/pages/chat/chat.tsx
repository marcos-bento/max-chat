import React from "react";
import style from "../../Common/CSS/conteudo.module.css"
import chatStyle from "./chat.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Input from "../../components/formulario/input/input";
import Perfil from "../../components/imagemDePerfil/perfil";

function Chat(){
    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Max Chat</h3>
                <div className={style.conversas}>
                    <Modal altura={0}> {/* Quando enviar 0 o componente insere "height: auto" */}
                        <div className={chatStyle.chat_container}>
                            <p className={chatStyle.chat_titulo}>Conversa com: Marcos</p>
                            {/* Mensagem Recebida: */}
                            <div className={chatStyle.chat_income}>
                                <p className={chatStyle.chat_income_text}>Marcos disse as 20:18</p>  
                                <div className={chatStyle.chat_income_balao}>
                                    <Perfil/>
                                    <p className={chatStyle.chat_content}>Você jogou aquele jogo da memória?</p>    
                                </div>                              
                            </div>
                            {/* Mensagem Enviada: */}
                            <div className={chatStyle.chat_outcome}>
                                <p className={chatStyle.chat_outcome_text}>Você disse as 20:20</p>  
                                <div className={chatStyle.chat_outcome_balao}>
                                    <Perfil/>
                                    <p className={chatStyle.chat_content}>Joguei sim e curti bastante o jogo, meus sobrinhos também adoraram!</p>    
                                </div>                              
                            </div>
                                {/* Mensagem Recebida: */}
                                <div className={chatStyle.chat_income}>
                                <p className={chatStyle.chat_income_text}>Marcos disse as 20:20</p>  
                                <div className={chatStyle.chat_income_balao}>
                                    <Perfil/>
                                    <p className={chatStyle.chat_content}>Será que tem alguma novidade saindo?</p>    
                                </div>                              
                            </div>
                                {/* Mensagem Recebida: */}
                                <div className={chatStyle.chat_income}>
                                <p className={chatStyle.chat_income_text}>Marcos disse as 20:22</p>  
                                <div className={chatStyle.chat_income_balao}>
                                    <Perfil/>
                                    <p className={chatStyle.chat_content}>E você viu o último lançamento? Vai sair em Dezembro...</p>    
                                </div>                              
                            </div>
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