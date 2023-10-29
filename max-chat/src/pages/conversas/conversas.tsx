import React from "react";
import style from "../../Common/CSS/conteudo.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";

function Conversas(){
    return(
        <>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Todas conversas</h3>
                <div className={style.conversas}>
                    <Balao tipo={"chat"}/>
                    <Balao tipo={"chat"}/>
                    <Balao tipo={"chat"}/>
                    <Balao tipo={"chat"}/>
                    <Balao tipo={"chat"}/>
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                <Link to="/menu">
                    <BotaoGrande icon={"fa-solid fa-house"} texto={"Voltar ao Menu"}/>
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

export default Conversas;