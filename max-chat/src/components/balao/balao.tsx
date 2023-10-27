import React from "react";
import style from './balao.module.css'
import Perfil from "../imagemDePerfil/perfil";

function Balao(){
    return (
        <div className={style.balao}>
            <Perfil/>
            <svg width="238" height="65" viewBox="0 0 238 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M16 32.5C16 14.5507 30.5507 0 48.5 0H205.5C223.449 0 238 14.5507 238 32.5C238 50.4493 223.449 65 205.5 65H48.5C30.5507 65 16 50.4493 16 32.5Z" fill="#FFFFFF"/>
                    <path d="M29.8564 19L29.8564 46.7128L5.85641 32.8564L29.8564 19Z" fill="#FFFFFF"/>
                    <foreignObject x="30" y="-5" width="187" height="75">
                        <p>Marcos diz: E você viu o último lançamento? Vai sair em Dezembro...</p>
                    </foreignObject>
                </g>
                
            </svg>
        </div>
    )
}

export default Balao;
