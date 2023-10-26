import React, { Children } from "react";
import style from "./icone.module.css"

function Icon({icon, active = true, cor = ""}: {icon: string, active?: boolean, cor?: string}){
    return (
        <i className={`fa-2xl ${icon} ${active ? style.icone : style.icone_inativo} ${cor === "branco" ? style.icone_branco : ""}`}></i>
    )
}

export default Icon;