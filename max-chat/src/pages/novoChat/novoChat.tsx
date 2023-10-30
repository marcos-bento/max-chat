import React from "react";
import style from "../../Common/CSS/conteudo.module.css"
import styleNovoChat from "./novoChat.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Select from "../../components/formulario/select/select";

function NovoChat(){
    return(
        <>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Nova conversa</h3>
                <div className={style.conversas}>
                    <Modal altura={100}>
                        <div className={styleNovoChat.novoChat}>
                            <p>Selecione o contato:</p>
                            <Select placeholder={"Selecione o contato"}/>
                        </div>
                    </Modal>
                    <Link to="/chat">
                        <Balao tipo={"botao"} icone={"fa-solid fa-comment-dots"} cor={"azul"} texto={"Iniciar conversa"}/>
                    </Link>
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
            </section>
            <Rodape />
        </>
    )
};

export default NovoChat;