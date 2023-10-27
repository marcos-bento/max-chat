import React from "react";
import { Link } from 'react-router-dom';
import style from "./formulario.module.css"
import Input from "./input/input";
import Botao from "../botao/botao";

function Formulario({type = ""}:{type?:string}){
    return (
        <div className={(type === "" ? style.formulario : style.formulario_medio)}>
            <p className={style.formulario_texto}>Login:</p>
            <Input placeholder={"Digite seu e-mail"}/>
            <p className={style.formulario_texto}>Senha:</p>
            <Input placeholder={"Digite sua senha"}/>
            {(type === "" ? "" : 
            <>
                <p className={style.formulario_texto}>Nome:</p>
                <Input placeholder={"Digite seu nome"}/>
            </>
            )}
            
            {/* Se o Login foi feito corretamente */}
            {/* Se o Registro foi feito corretamente */}
            <Link to="/menu">
                <Botao texto={(type === "" ? "Entrar" : "Registrar")}/>
            </Link>

            {/* Caso contrário exibir modal com erro (A programar) */}
        </div>
    )
}

export default Formulario;
