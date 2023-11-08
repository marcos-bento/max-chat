import React from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/cabecalho/cabecalho';
import BotaoGrande from '../../components/botaoGrande/botaoGrande';
import style from '../../Common/CSS/conteudo.module.css';
import Rodape from '../../components/rodape/rodape';
import { conectApi } from '../../Services/conectaApi';
import { Conversa } from '../../Interfaces/conversa';
import { ConversaChat } from '../../Interfaces/conversaChat';
import { UsuarioLogado } from '../../Services/usuarioLogado';
import { Cadastro } from '../../Interfaces/cadastro';

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
              user_1_nome: "Marcos Bento",
              user_2_id: 2,
              user_2_nome: "Fabio Albarelli",
              content: [
                {
                  user: "Marcos",
                  user_id: 1,
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
            const conversaAnterior = await conectApi.recuperaChat(2);
            const conteudoExistente = conversaAnterior.conexaoConvertida.content;
            const novasMensagens = [
              { user: "Marcos", hora: "20:20", chat: "Nova mensagem 3" },
            ];
            const novoConteudo = [...conteudoExistente, ...novasMensagens];
            const novaConversa: Conversa = {
              user_1_id: conversaAnterior.conexaoConvertida.user_1_id,
              user_1_nome: conversaAnterior.conexaoConvertida.user_1_nome,
              user_2_id: conversaAnterior.conexaoConvertida.user_2_id,
              user_2_nome: conversaAnterior.conexaoConvertida.user_2_nome,
              content: novoConteudo,
            };

            const resultado = await conectApi.atualizaConversa(2, novaConversa);
            console.log(resultado.conexaoConvertida)
          }}
        >
        <BotaoGrande icon="fa-solid fa-question" texto="Teste: Atualizar conversa" />
        </div>

        {/* ############################## */}

        <div
          onClick={async () => {
            const todosContatos = await conectApi.recuperaUsuarioPorID(3);
            const contatosAntigos = todosContatos.conexaoConvertida.contatos;
            // Recupera o valor do último ID (numeral)
            const ultimoID = (contatosAntigos.length > 0 ? contatosAntigos[contatosAntigos.length-1].id : 0);
            // Dados do novo contato
            let novoContato = [
              {
                id: (ultimoID + 1),
                email: "pedro@gmail.com", 
                nome: "Jose", 
                apelido: ""
              }
            ]
            // Valida se o contato já existe na lista
            for (const iterator of contatosAntigos) {
              if (iterator.email === novoContato[0].email){
                alert("O e-mail informado já existe no seu banco de dados!");
                novoContato = []; // Se o contato já existir então zera-se o novo contato
                break;
              }
            }
            const cadastroAtualizado: Cadastro = {
              email: todosContatos.conexaoConvertida.email,
              nome: todosContatos.conexaoConvertida.nome,
              senha: todosContatos.conexaoConvertida.senha,
              imagem: todosContatos.conexaoConvertida.imagem,
              contatos: [...contatosAntigos, ...novoContato],
            }

            const resultado = await conectApi.atualizaUsuario(3, cadastroAtualizado);
            console.log(resultado.statusConexao);
          }}
        >
        <BotaoGrande icon="fa-solid fa-question" texto="Teste: Atualiza Contatos" />
        </div>

        {/* FIM DA ÁREA DE TESTES ## DELETAR ##*/}

      </section>
      <Rodape />
    </div>
  );
}

export default Index;
