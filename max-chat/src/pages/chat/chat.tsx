import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css"
import inputStyle from "../../components/formulario/input/input.module.css"
import chatStyle from "./chat.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Perfil from "../../components/imagemDePerfil/perfil";
import { useUser } from "../../Services/userContext";
import { useChat } from "../../Services/chatContext";
import { conectApi } from "../../Services/conectaApi";
import { useContatoEmFoco } from "../../Services/contatoContext";
import Botao from "../../components/botao/botao";
import { Conversa } from "../../Interfaces/conversa";
import { ConversaChat } from "../../Interfaces/conversaChat";

function Chat(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const { chat, setChat } = useChat();
    const { contatoEmFoco, setContatoEmFoco } = useContatoEmFoco();
    const [destinatario, setDestinatario] = useState<{nome: string, email: string, id: number}>();
    const [chatEmFoco, setChatEmFoco] = useState<ConversaChat[]>([]);
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalButton, setModalButton] = useState("");
    const [campoValor, setCampoValor] = useState("");

    useEffect(() => {
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        }
        const interval = setInterval(() => {
          pegaMensagens();
        }, 5000); // Verifique a cada 5 segundos
      
        return () => clearInterval(interval);
    }, []);

    const pegaMensagens = async () => { // Função que acessa o BD e retorna as mensagens
        if (chat){ // Se o usuário veio direto de uma conversa existente
            const conversa = await conectApi.recuperaChat(chat);
            const dadosDaConversa = conversa.conexaoConvertida;
            setDestinatario({
                nome: dadosDaConversa.user_1_id === usuarioLogado.usuarioId ? dadosDaConversa.user_2_nome : dadosDaConversa.user_1_nome,
                email: "",
                id: 0
            });
            const mensagens = dadosDaConversa.content;
            setChatEmFoco(mensagens);
            atualizaLeitura(chat, dadosDaConversa);
        } else { // Se não vamos criar uma conversa do zero:
            const usuarioDestino = await conectApi.recuperaUsuarioPorEmail(contatoEmFoco);
            setDestinatario({
                nome: usuarioDestino.conexaoConvertida[0].nome,
                email: usuarioDestino.conexaoConvertida[0].email,
                id: usuarioDestino.conexaoConvertida[0].id,
            });       
        };
    };

    const atualizaLeitura = async (idDoChat: number, conversa: Conversa) =>{
        //Verifique se há alguma mensagem não lida para o usuário atual
        const temMensagemNaoLida = conversa.content.some((mensagem: ConversaChat) => {
            return mensagem.user_id !== usuarioLogado.usuarioId && !mensagem.lido;
        });

        console.log(temMensagemNaoLida);

        // Se houver, atualize as mensagens como lidas
        if (temMensagemNaoLida) {
            const contentAtualizado  = conversa.content.map((mensagem: ConversaChat) => {
                if (mensagem.user_id === usuarioLogado.usuarioId){
                    return {...mensagem};
                }else{
                    return {...mensagem, lido: true}; // Primeiro altero todas mensagens para true
                };
            });
    
            const conversaAtualizada = { ...conversa, content: contentAtualizado };
            const resultado = await conectApi.atualizaConversaLeitura(idDoChat, conversaAtualizada);
            if (resultado.statusConexao < 199 && resultado.statusConexao > 300){
                alert(`Erro: ${resultado.statusConexao}!`);
            } else {
                console.log('Sucesso');
            };
        };
    };

    const pegaHora = () => {
        const carimbo = new Date().getTime() / 1000; // Obtém o carimbo Unix
        const data = new Date(carimbo * 1000); // Converte o carimbo para milissegundos e cria um objeto Date
        const horas = data.getHours().toString().padStart(2, '0'); // Obtém as horas no formato 00
        const minutos = data.getMinutes().toString().padStart(2, '0'); // Obtém os minutos no formato 00
        const horaFormatada = `${horas}:${minutos}`; // Formata a hora e os minutos
        return horaFormatada
    };

    const pegaData = () => {
        const carimbo = new Date().getTime() / 1000; // Obtém o carimbo Unix
        const data = new Date(carimbo * 1000); // Converte o carimbo para milissegundos
        const dia = data.getUTCDay();
        const mes = data.getUTCMonth();
        const ano = data.getUTCFullYear();
        const dataCompleta = `${ano}-${mes}-${dia}`;
        return dataCompleta;
    }

    const handleTextoSubmit = async () => {
        if (!campoValor){
            handleModal("Escreva alguma mensagem primeiro!","vermelho");
        } else {
            const todasMensagens = chatEmFoco ? chatEmFoco : [];
            const novaMensagem = ({
                user: usuarioLogado.usuarioNome,
                user_id: usuarioLogado.usuarioId,
                hora: pegaHora(),
                chat: campoValor,
                data: pegaData(),
                lido: false,
            });
            setCampoValor(""); // Limpe o valor do campo
            todasMensagens.push(novaMensagem);
            if (!chat){ // Se é a primeira mensagem da conversa
                registraConversa(todasMensagens[0]); // Então registra no BD
            } else {
                const conversaAtual = await conectApi.recuperaChat(chat);
                const conversaAtualizada: Conversa = ({
                    ...conversaAtual.conexaoConvertida,
                    content: [...todasMensagens]
                });
                conectApi.atualizaConversa(chat, conversaAtualizada) // Senão, apenas atualiza a lista de mensagens
            };
            pegaMensagens();
        }
    };

    const registraConversa = async (todasMensagens: ConversaChat) => {
        const novaConversa: Conversa = {
            user_1_id: usuarioLogado.usuarioId,
            user_1_nome: usuarioLogado.usuarioNome,
            user_2_id: destinatario?.id || 0,
            user_2_nome: destinatario?.nome || "",
            content: [todasMensagens],
        };
        const resultado = await conectApi.registraConversa(novaConversa);
        if (resultado.statusConexao < 199 || resultado.statusConexao > 300){
            handleModal("Houve um erro ao enviar sua mensagem", "vermelho");   
        } else {
            setChat(resultado.conexaoConvertida.id);
        };
    };

    const handleModal = (text: string, corBotao: string) => {
        setModal(true);
        setModalText(text);
        setModalButton(corBotao);
    };

    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                {modal && <div className={style.modal_alert}>
                    {/* Modal */}
                    <Modal altura={0}>
                        <div className={style.modal_alert_content}>
                            <p>{modalText}</p>
                            <Botao texto ="Ok" cor={modalButton} onClick={() => {setModal(false)}}/>
                        </div>
                    </Modal>
                </div>}
                <h3 className={style.titulo}>Max Chat</h3>
                <div className={style.conversas}>
                    <Modal altura={0}> {/* Quando enviar 0 o componente insere "height: auto" */}
                        <div className={chatStyle.chat_container}>
                            <p className={chatStyle.chat_titulo}>Conversa com: {destinatario?.nome}</p>
                            {chatEmFoco && chatEmFoco.length === 0 && <p className={chatStyle.chat_titulo}>Ainda sem mensagens, mande a primeira!</p>}
                            {chatEmFoco && chatEmFoco.map((item, index) =>{
                                return (
                                    <div key={index} className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_income : chatStyle.chat_outcome)}>
                                    <p className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_income_text : chatStyle.chat_outcome_text)}>{item.user} disse as {item.hora}</p>  
                                    <div className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_income_balao : chatStyle.chat_outcome_balao)}>
                                        <Perfil idDoUsuario={item.user_id}/>
                                        <p className={chatStyle.chat_content}>{item.chat}</p>
                                    </div>                              
                                </div>
                                )
                            })}
                        </div>
                        <div  className={chatStyle.chat_submit}>
                            <input
                                className={inputStyle.input}
                                type="text"
                                placeholder="Digite sua mensagem"
                                value={campoValor}
                                onChange={(e) => setCampoValor(e.target.value)}
                            />
                            {destinatario?.nome  ? <div className={chatStyle.chat_submit_botao} onClick={handleTextoSubmit}>
                                <p className={chatStyle.chat_submit_botao_texto}>Enviar mensagem</p>
                            </div>
                            :
                            <p>Aguarde! Carregando...</p>}
                        </div>
                    </Modal>
                </div>
            </section>
            <section className={style.containerDeBotoes}>
                <Link to="/menu">
                    <BotaoGrande icon={"fa-solid fa-house"} texto={"Voltar ao Menu"}/>
                </Link>
                <Link to="/conversas">
                    <BotaoGrande icon={"fa-regular fa-comments"} texto={"Ver todas as conversas"}/>
                </Link>
                <Link to="/contatos">
                    <BotaoGrande icon={"fa-solid fa-address-book"} texto={"Ver todos os contatos"}/>
                </Link>
                <Link to="/novoChat">
                    <BotaoGrande icon={"fa-solid fa-plus"} texto={"Iniciar nova conversa"}/>
                </Link>
            </section>
            <Rodape />
        </div>
    )
};

export default Chat;
