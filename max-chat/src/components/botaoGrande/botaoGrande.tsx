import React from "react";
import style from "./botaoGrande.module.css"
import Icon from "../icone/icone";

function BotaoGrande({icon, texto} : {icon: string, texto: string}){
    return (
        <button className={style.botao_grande}>
            <Icon icon={icon} cor="branco"/>
            <p className={style.botao_grande_texto}>{texto}</p>
        </button>
    )
}

export default BotaoGrande;