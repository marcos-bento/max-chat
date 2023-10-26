import React from 'react';
import Cabecalho from '../../components/cabecalho/cabecalho';
import style from '../../Common/CSS/conteudo.module.css';
import Rodape from '../../components/rodape/rodape';
import Modal from '../../components/modal/modal';

function Sobre() {
  return (
    <>
      <Cabecalho />
      <section className={style.conteudo}>
        <h3 className={style.titulo}>Sobre</h3>
        <Modal/>
      </section>
      <Rodape />
    </>
  );
}

export default Sobre;