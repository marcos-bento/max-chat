import React from "react";
import style from "../../Common/CSS/conteudo.module.css"
import menuStyle from "./menu.module.css"
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";

function Menu(){
    return(
        <>
            <Cabecalho />
            <section className={style.conteudo}>
                <h3 className={style.titulo}>Últimas conversas</h3>
                <div className={menuStyle.conversas}>
                    <Balao/>
                    <Balao/>
                    <Balao/>
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                    <BotaoGrande icon={"fa-regular fa-comments"} texto={"Ver todas as conversas"}/>
                    <BotaoGrande icon={"fa-solid fa-address-book"} texto={"Ver todos os contatos"}/>
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
            </section>
            <Rodape />
        </>
    )
};

export default Menu;