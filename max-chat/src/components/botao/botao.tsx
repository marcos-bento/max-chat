import React from "react";
import style from "./botao.module.css";

interface Props {
  texto: string;
  cor?: string;
  onClick: () => void; // Define a prop onClick como uma função sem parâmetros e sem valor de retorno.
}

function Botao({ texto, cor="verde", onClick }: Props) {
  return (
    <button onClick={onClick} className={`${style.botao} ${cor === "verde" ? style.botao_verde : style.botao_vermelho}`}>
      <p className={style.botao_texto}>{texto}</p>
    </button>
  );
}

export default Botao;
