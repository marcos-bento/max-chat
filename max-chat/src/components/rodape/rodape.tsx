import React from "react";
import style from "./rodape.module.css"
import Icon from "../icone/icone";

function Rodape(){
    return (
        <footer className={style.rodape}>
            <p>projeto para fim de portfólio <br></br>Desenvolvido por Marcos Bento - 2023</p>
            <div className={style.rodape_icones}>
                <a href={"https://github.com/marcos-bento"} target="_blank"><Icon icon="fa-brands fa-github" cor={"branco"}/></a>
                <a href={"https://www.linkedin.com/in/marcosluizdev/"} target="_blank"><Icon icon="fa-brands fa-linkedin" cor={"branco"}/></a>
            </div>
        </footer>
    )
}

export default Rodape;
