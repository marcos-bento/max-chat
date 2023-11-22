import React from "react";
import style from "./icone.module.css"

function Icon({icon, cor = "", tamanho="fa-2xl"}: {icon: string, cor?: string, tamanho?: string}){
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
        case "icone-foto":
            cor = "icone_foto";
            break;
        case "chat":
            cor = "chat";
            break;
        default:
            cor = "icone";
            break;
    }
    return (
        <i className={`${tamanho} ${icon} ${style[cor || 'icone']}`}></i>
    )
}

export default Icon;