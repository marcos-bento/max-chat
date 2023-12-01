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

        {/* ÁREA DE TESTE DE DESENVOLVIMENTO! DELETAR! */}
        
        <div onClick={async ()=>{

          try {
            const docRef = await addDoc(collection(db, "user"), {
              nome: "Nome",
              email: "email",
              imagem: "",
              gravatar: false,
              id: 1
            });
          
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | ADICIONAR NO BD" />
        </div>

        {/* ################# */}

        <div onClick={async ()=>{
          console.log("UID: ", uid);
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | LER ID LOGADO" />
        </div>
        
        {/* ################# */}

        <div onClick={async ()=>{
          const usuario = await conectApi.recuperaIDPorCampoUserID("djTXg8wm3DbYSQYF6L1w04VO9vq1");
          console.log("ID (PK): ", usuario);
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | LER UM USUARIO POR ID" />
        </div>

        {/* ################# */}

        <div onClick={async ()=>{
          const novoUsuario = {
            email: "novo email",
            nome: "novo nome",
            imagem: "nova imagem",
            gravatar: false
          };
          console.log(await conectApi.atualizaUsuario("E3om0X1fosfosCKWmYZQiuZhJQm2",novoUsuario));
          
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | ATUALIZAR USUARIO" />
        </div>

        {/* ################# */}

        <div onClick={async ()=>{
          const result = await conectApi.recuperaContatosPorID("mN7pMqx4UiwU0vEoatZy");
          if (result){
            console.log("Contatos: ", result);
          };
          
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | EXIBE CONTATOS DO USUARIO" />
        </div>

        {/* ################# */}

        <div onClick={async ()=>{
          try {
            const novaConversa = {
              deletado: false,
              user_1_id: "fa",
              user_1_nome: "Marcos Bento",
              user_2_id: "fa",
              user_2_nome: "Fabio Albarelli"
            } 
            const resul = await conectApi.registraConversa(novaConversa);
            if (resul){
              console.log("Criou conversa com sucesso!");
            } else {
              console.log(resul);
            };
          } catch (e) {
            console.log("Error: ", e);
          };
          
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | ADICIONA CONVERSA NO BD" />
        </div>        

        {/* ################# */}

        <div onClick={async ()=>{
          try {
            const novaMensagem: Mensagem = {
              deletado: false,
              user: "Marcos Bento",
              user_id: "kumR7ZoRIBX3x62XQ1jT",
              hora: "11:53",
              chat: "Mais uma nova!",
              data: "2023-11-12",
              lido: false,
              conversa_id: "uJrrylLPhUGFKOKPqOtx", // ID da conversa (FK)
              destinatario_id: "qeoWr5KkeiNiQQ8VF8DC",
              destinatario: "José",
              id: 1
            }
            const resul = await conectApi.registraMensagem("uJrrylLPhUGFKOKPqOtx", novaMensagem);
            if (resul){
              console.log("Mensagem enviada com sucesso!");
            } else {
              console.log(resul);
            };
          } catch (e) {
            console.log("Error: ", e);
          };
          
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | ADICIONA MENSAGEM NO BD" />
        </div>    

        {/* ################# */}

        <div onClick={async ()=>{
          try {
            const chat = await conectApi.recuperaTodasMensagensPorId("To9KmW92ywcfFURXHT9U");
            console.log(chat);
          } catch(e){
            console.log("Erro na chamada: ",e);
          };
          
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | EXIBE MENSAGENS DE UMA CONVERSA" />
        </div>    

        {/* ################# */}

        <div onClick={async ()=>{
          try {
            const chat = await conectApi.atualizaConversaLeitura("To9KmW92ywcfFURXHT9U", "qeoWr5KkeiNiQQ8VF8DC");
            if (chat){
              console.log("Mensagens lidas!");
            } else {
              console.log("Erro!");
            }
          } catch(e){
            console.log("Erro na chamada: ",e);
          };
          
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | ATUALIZA LEITURA" />
        </div>   

        {/* ################# */}

        <div onClick={async ()=>{
          try {
            const chat = await conectApi.deletaConversa("To9KmW92ywcfFURXHT9U");
            if (chat){
              console.log("Conversa apagada!!");
            } else {
              console.log("Erro!");
            }
          } catch(e){
            console.log("Erro na chamada: ",e);
          };
          
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | DELETA CONVERSA" />
        </div>   

        {/* ################# */}

        <div onClick={async ()=>{
          try {
            const chat = await conectApi.recuperaUltimasMensagensPorId("kumR7ZoRIBX3x62XQ1jT", 3);
            if (chat){
              console.log("Chat: ",chat);
            } else {
              console.log("Erro mané")
            }
          } catch(e){
            console.log("Erro na chamada: ",e);
          };
          
        }}>
          <BotaoGrande icon="fa-solid fa-question" texto="TESTE | EXIBIR ULTIMAS MENSAGENS" />
        </div>

        {/* FIM DA ÁREA DE TESTES */}
      </section>
      <Rodape />
    </div>
  );
}

export default Index;
