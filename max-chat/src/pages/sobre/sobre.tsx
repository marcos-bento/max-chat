import React from 'react';
import Cabecalho from '../../components/cabecalho/cabecalho';
import style from '../../Common/CSS/conteudo.module.css';
import sobreStyle from './sobre.module.css';
import Rodape from '../../components/rodape/rodape';
import Modal from '../../components/modal/modal';

function Sobre() {
  return (
    <div className={style.pagina}>
      <Cabecalho />
      <section className={style.conteudo}>
        <h3 className={style.titulo}>Sobre</h3>
        <Modal altura={500}>
          <div className={sobreStyle.titulo__container}>
            <h1 className={sobreStyle.titulo}>Max</h1>
            <h2 className={sobreStyle.titulo}>Chat</h2>
          </div>
          <p className={sobreStyle.texto}>O projeto Max Chat foi criado para fins de treinamento e prática das principais tecnologias do mercado, construído com Typescript, utilizando Bootstrap, React e até mockando um Rest API para conexão com banco de dados, o projeto foi um desafio e ao mesmo tempo a consolidação do conhecimento adquirido durante diversos cursos e aperfeiçoamentos do desenvolvedor.
          <br></br><br></br>
          Nenhuma informação, dado ou registro é armazenado ou enviado a outra instituição.
          <br></br><br></br>
          Toda mensagem veiculada é de responsabilidade do usuário.
          <br></br><br></br>
          Gostaria de ressaltar que este projeto foi desenvolvido com o objetivo principal de estudar e aprimorar minhas habilidades em React com Typescript. Como parte desse objetivo, optei por manter a infraestrutura do servidor simples e direta, usando o JSON Server para simular um servidor API REST.

          Por favor, esteja ciente de que essa escolha tem algumas limitações em relação à segurança e ao comportamento em tempo real. Não implementei recursos avançados de criptografia e autenticação, e a mensagem pode não aparecer em tempo real. Em vez disso, uso uma abordagem de "polling" para verificar novas mensagens periodicamente.

          Essas limitações são deliberadas e fazem parte do escopo do meu projeto de estudo. Meu foco principal é aprimorar minhas habilidades em desenvolvimento front-end com React e Typescript.

          Agradeço por sua compreensão e paciência. Espero que você aproveite a experiência e os recursos que ofereço. Se tiver alguma dúvida ou feedback, sinta-se à vontade para entrar em contato comigo.
          </p>
        </Modal>
      </section>
      <Rodape />
    </div>
  );
}

export default Sobre;