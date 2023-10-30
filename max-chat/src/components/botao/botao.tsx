import React from "react";
import style from "./botao.module.css";

interface Props {
  texto: string;
  onClick: () => void; // Define a prop onClick como uma função sem parâmetros e sem valor de retorno.
}

function Botao({ texto, onClick }: Props) {
  return (
    <button onClick={onClick} className={style.botao_verde}>
      <p className={style.botao_texto}>{texto}</p>
    </button>
  );
}
function BotaoValidaLogin(){
    console.log("validando")
}

export default Botao;
