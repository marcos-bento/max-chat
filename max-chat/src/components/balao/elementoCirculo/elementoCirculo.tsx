import React from "react"
import style from "./elementoCirculo.module.css"
import Icon from "../../icone/icone";

function ElementoCirculo({icon, cor}:{icon: string, cor: string}){
    return(
        <div className={style.elemento_circulo}>
            <Icon icon={icon}cor={cor}/>
        </div>
    )
}

export default ElementoCirculo;