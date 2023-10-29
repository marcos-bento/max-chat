import React from "react";
import style from "./icone.module.css"

function Icon({icon, cor = ""}: {icon: string, cor?: string}){
    switch (cor) {
        case "branco":
            cor = "icone_branco";
            break;
        case "verde":
            cor = "icone_verde";
            break;
        case "azul":
            cor = "icone_azul";
            break;
        case "vermelho":
            cor = "icone_vermelho";
            break;
        case "cinza":
            cor = "icone_cinza";
            break;
        default:
            cor = "icone";
            break;
    }
    return (
        <i className={`fa-2xl ${icon} ${style[cor || 'icone']}`}></i>
    )
}

export default Icon;