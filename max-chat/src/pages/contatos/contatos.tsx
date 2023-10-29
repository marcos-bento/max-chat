import React from "react";
import style from "../../Common/CSS/conteudo.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";

function Contatos(){
    return(
        <>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Todos contatos</h3>
                <div className={style.conversas}>
                    <Balao tipo={"contato"}/>
                    <Balao tipo={"contato"}/>
                    <Balao tipo={"contato"}/>
                    <Balao tipo={"contato"}/>
                    <Balao tipo={"botao"}/>
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                <Link to="/menu">
                    <BotaoGrande icon={"fa-solid fa-house"} texto={"Voltar ao Menu"}/>
                </Link>
                <Link to="/conversas">
                    <BotaoGrande icon={"fa-regular fa-comments"} texto={"Ver todas as conversas"}/>
                </Link>
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
            </section>
            <Rodape />
        </>
    )
};

export default Contatos;