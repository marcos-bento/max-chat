import React from "react";
import style from "./modal.module.css"

function Formulario(){
    return (
        <div className={style.modal}>
            <div className={style.titulo__container}>
                <h1 className={style.titulo}>Max</h1>
                <h2 className={style.titulo}>Chat</h2>
            </div>
            <p>O projeto Max Chat foi criado para fins de treinamento e prática das principais tecnologias do mercado, construído com Typescript, utilizando Bootstrap, React e até mockando um Rest API para conexão com banco de dados, o projeto foi um desafio e ao mesmo tempo a consolidação do conhecimento adquirido durante diversos cursos e aperfeiçoamentos do desenvolvedor.
            <br></br><br></br>
            Nenhuma informação, dado ou registro é armazenado ou enviado a outra instituição.
            <br></br><br></br>
            Toda mensagem veiculada é de responsabilidade do usuário.</p>
        </div>
    )
}

export default Formulario;