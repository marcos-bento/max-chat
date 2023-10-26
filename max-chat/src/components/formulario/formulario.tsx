import React from "react";
import { Link } from 'react-router-dom';
import style from "./formulario.module.css"
import Input from "./input/input";
import Botao from "../botao/botao";

function Formulario(){
    return (
        <div className={style.formulario}>
            <p className={style.formulario_texto}>Login:</p>
            <Input placeholder={"Digite seu e-mail"}/>
            <p className={style.formulario_texto}>Senha:</p>
            <Input placeholder={"Digite sua senha"}/>
            <Link to="/">
                <Botao texto={"Entrar"}/>
            </Link>
        </div>
    )
}

export default Formulario;
