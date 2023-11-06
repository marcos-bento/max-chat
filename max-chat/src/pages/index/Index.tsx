import React from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/cabecalho/cabecalho';
import BotaoGrande from '../../components/botaoGrande/botaoGrande';
import style from '../../Common/CSS/conteudo.module.css';
import Rodape from '../../components/rodape/rodape';
import { conectApi } from '../../Services/conectaApi';
import { Conversa } from '../../Interfaces/conversa';
import { ConversaChat } from '../../Interfaces/conversaChat';

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

        {/* ÁREA DE TESTES ## DELETAR ##*/}

        <div
          onClick={async () => {
            const novaConversa: Conversa = {
              user_1_id: 1,
              user_2_id: 2,
              content: [
                {
                  user: "Marcos",
                  hora: "20:20",
                  chat: "Oi, cara de boi!",
                },
              ],
            };

            const resultado = await conectApi.registraConversa(novaConversa);
          }}
        >
        <BotaoGrande icon="fa-solid fa-question" texto="Teste: Criar nova conversa" />
        </div>

        {/* ############################## */}

        <div
          onClick={async () => {
            const conversaAnterior = await conectApi.recuperaConversa(2);
            const conteudoExistente = conversaAnterior.conexaoConvertida.content;
            const novasMensagens = [
              { user: "Marcos", hora: "20:20", chat: "Nova mensagem 3" },
            ];
            const novoConteudo = [...conteudoExistente, ...novasMensagens];
            const novaConversa: Conversa = {
              user_1_id: conversaAnterior.conexaoConvertida.user_1_id,
              user_2_id: conversaAnterior.conexaoConvertida.user_2_id,
              content: novoConteudo,
            };

            const resultado = await conectApi.atualizaConversa(2, novaConversa);
            console.log(resultado.conexaoConvertida)
          }}
        >
        <BotaoGrande icon="fa-solid fa-question" texto="Teste: Atualizar conversa" />
        </div>

        {/* FIM DA ÁREA DE TESTES ## DELETAR ##*/}

      </section>
      <Rodape />
    </div>
  );
}

export default Index;
