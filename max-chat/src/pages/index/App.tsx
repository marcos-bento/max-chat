import React from 'react';
import Cabecalho from '../../components/cabecalho/cabecalho';
import BotaoGrande from '../../components/botaoGrande/botaoGrande';
import style from "./App.module.css"
import Rodape from '../../components/rodape/rodape';

function App() {
  return (
    <>
      <Cabecalho/>
      <section className={style.conteudo}>
        <h3 className={style.titulo}>Max Chat</h3>
        <BotaoGrande icon={"fa-solid fa-right-to-bracket"} texto={"Login | Já sou membro"}/>
        <BotaoGrande icon={"fa-solid fa-user-plus"} texto={"Signup | Novo registro"}/>
        <BotaoGrande icon={"fa-solid fa-question"} texto={"Dúvidas | Sobre"}/>
      </section>
      <Rodape/>
    </>
  );
}

export default App;
