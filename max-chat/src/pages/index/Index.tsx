import React from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/cabecalho/cabecalho';
import BotaoGrande from '../../components/botaoGrande/botaoGrande';
import style from '../../Common/CSS/conteudo.module.css';
import Rodape from '../../components/rodape/rodape';
// Imports para teste (DELETAR)
import { addDoc, collection, getDocs  } from "firebase/firestore"; 
import { auth, db } from '../../Services/firebase';
import { conectApi } from '../../Services/conectaApi';
import { Mensagem } from '../../Interfaces/mensagem';
// Fim dos imports de teste


function Index() {
  // Teste (DELETAR)
  const uid = auth.currentUser?.uid;
  // Fim

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
