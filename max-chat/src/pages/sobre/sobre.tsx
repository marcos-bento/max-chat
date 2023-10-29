import React from 'react';
import Cabecalho from '../../components/cabecalho/cabecalho';
import style from '../../Common/CSS/conteudo.module.css';
import sobreStyle from './sobre.module.css';
import Rodape from '../../components/rodape/rodape';
import Modal from '../../components/modal/modal';

function Sobre() {
  return (
    <>
      <Cabecalho />
      <section className={style.conteudo}>
        <h3 className={style.titulo}>Sobre</h3>
        <Modal altura={500}>
          <div className={sobreStyle.titulo__container}>
            <h1 className={sobreStyle.titulo}>Max</h1>
            <h2 className={sobreStyle.titulo}>Chat</h2>
          </div>
          <p>O projeto Max Chat foi criado para fins de treinamento e prática das principais tecnologias do mercado, construído com Typescript, utilizando Bootstrap, React e até mockando um Rest API para conexão com banco de dados, o projeto foi um desafio e ao mesmo tempo a consolidação do conhecimento adquirido durante diversos cursos e aperfeiçoamentos do desenvolvedor.
          <br></br><br></br>
          Nenhuma informação, dado ou registro é armazenado ou enviado a outra instituição.
          <br></br><br></br>
          Toda mensagem veiculada é de responsabilidade do usuário.</p>
        </Modal>
      </section>
      <Rodape />
    </>
  );
}

export default Sobre;