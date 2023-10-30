import React from "react";
import style from "../../Common/CSS/conteudo.module.css"
import novoContatoStyle from "./novoContato.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Input from "../../components/formulario/input/input";

function NovoContato(){
    return(
        <>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Adicionar contato</h3>
                <div className={style.conversas}>
                    <Modal altura={170}>
                        <div className={novoContatoStyle.novoContato}>
                            <p>Digite o e-mail</p>
                            <Input placeholder={"Digite o e-mail do contato"}/>
                            <p>Conhecido como:</p>
                            <Input placeholder={"Digite o apelido para o contato"}/> 
                        </div>
                    </Modal>
                    <Balao tipo={"botao"} icone={"fa-solid fa-plus"} cor={"verde"} texto={"Adicionar contato"}/>
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
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
            </section>
            <Rodape />
        </>
    )
};

export default NovoContato;