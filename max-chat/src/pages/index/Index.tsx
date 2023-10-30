import React from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/cabecalho/cabecalho';
import BotaoGrande from '../../components/botaoGrande/botaoGrande';
import style from '../../Common/CSS/conteudo.module.css';
import Rodape from '../../components/rodape/rodape';

function Index() {
  return (
    <div className={style.pagina}>
      <Cabecalho />
      <section className={style.conteudo}>
        <h3 className={style.titulo}>Max Chat</h3>
        <Link to="/login">
          <BotaoGrande icon="fa-solid fa-right-to-bracket" texto="Login | Já sou membro" />
        </Link>
        <Link to="/registrar">
          <BotaoGrande icon="fa-solid fa-user-plus" texto="Signup | Novo registro" />
        </Link>
        <Link to="/sobre">
          <BotaoGrande icon="fa-solid fa-question" texto="Dúvidas | Sobre" />
        </Link>
      </section>
      <Rodape />
    </div>
  );
}

export default Index;
