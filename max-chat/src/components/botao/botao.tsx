import React from "react";
import style from "./botao.module.css"

function Botao({texto}:{texto:string}){
    return(
        <button className={style.botao_verde}><p className={style.botao_texto}>{texto}</p></button>
    )
}

export default Botao;