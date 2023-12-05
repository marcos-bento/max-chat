import React, { useEffect, useRef, useState } from "react";
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
import Icone from "../../components/icone/icone";
import { Contatos } from "../../Interfaces/contato";
import { Mensagem } from "../../Interfaces/mensagem";

function Chat(){
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const { chat, setChat } = useChat();
    const { contatoEmFoco, setContatoEmFoco } = useContatoEmFoco();
    const [exibeOpcoes, setExibeOpcoes] = useState(false);
    const [destinatario, setDestinatario] = useState<{nome: string, email: string, id: string}>();
    const [chatEmFoco, setChatEmFoco] = useState<Mensagem[]>([]);
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalButton, setModalButton] = useState("");
    const [campoValor, setCampoValor] = useState("");
    const chatDivScroll: any = useRef(null);
    const [botaoScroll, setBotaoScroll] = useState(false);
    const [deletarConversa, setDeletarConversa] = useState(false);
    const [conversaDeletada, setConversaDeletada] = useState(false);
    const [mensagemParaExcluir, setMensagemParaExcluir] = useState<number | null>(null);

    // useEffect principal, valida usuário logado e consulta DB com polling
    useEffect(() => {
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        }

        pegaMensagens();
    },[]);

    // useEffect dedicado a lógica de controle do botão flutuante de scroll
    useEffect(() => {
        const handleScroll = () => {
          const { scrollTop, clientHeight, scrollHeight } = chatDivScroll.current;
          setBotaoScroll(scrollTop + clientHeight < scrollHeight);
        };
    
        const chatDiv = chatDivScroll.current;
    
        if (chatDiv) {
          chatDiv.addEventListener('scroll', handleScroll);
        };
    
        return () => {
          if (chatDiv) {
            chatDiv.removeEventListener('scroll', handleScroll);
          }
        };
    }, []);

    // useEffect dedicado a scrollar a mensagem ao final quando a mesma for carregada
    useEffect(() => {
        chatDivScroll.current.scrollTop = chatDivScroll.current.scrollHeight;
    }, [destinatario && chatEmFoco]);
    
    // Função que pesquisa o apelido do contato cadastrado
    const recuperaUsuarioDestino = async (userIdPk: string) =>{
        const usuarioDestino = await conectApi.recuperaUsuarioPorID(userIdPk);
        return usuarioDestino;
    };

    // Função que verifica se as mensagens possuem a propriedade "deletado" como true
    const verificaMensagensDeletadas = async (mensagens:Mensagem[]) =>{
        const mensagensFiltradas:any = [];
        if (mensagens){
            mensagens.map((mensagem :{deletado: boolean})=>{
                if (!mensagem.deletado){
                    mensagensFiltradas.push(mensagem);
                } else {
                    mensagensFiltradas.push(mensagem);
                    mensagensFiltradas[mensagensFiltradas.length-1].chat = "Mensagem apagada";
                };
            });
            return mensagensFiltradas;
        };
    };

    // Função que acessa o BD e retorna as mensagens
    const pegaMensagens = async () => {
        if (chat){ // Se o usuário veio direto de uma conversa existente
            const conversa = await conectApi.recuperaConversaPorId(chat);
            if (typeof conversa === 'object'){
                
                const idDestino = (conversa.user_1_id === usuarioLogado.usuarioId ? conversa.user_2_id : conversa.user_1_id);

                const contatoDestino = await recuperaUsuarioDestino(idDestino);
                if (contatoDestino){
                    
                    setDestinatario({
                        nome: contatoDestino.nome,
                        email: contatoDestino.email,
                        id: idDestino
                    });
                };

                const mensagens = await conectApi.recuperaTodasMensagensPorId(chat) as Mensagem[];
                const mensagensFiltradas = verificaMensagensDeletadas(mensagens);
                if (conversa.deletado){
                    setConversaDeletada(true);
                    handleModal("Essa conversa foi deletada!", "vermelho");
                } else {
                    setChatEmFoco(mensagens);
                };
                atualizaLeitura(chat, await mensagensFiltradas);
            };
        } else { // Se não vamos criar uma conversa do zero:
            const usuarioDestino = await conectApi.recuperaUsuarioPorEmail(contatoEmFoco);
            if (usuarioDestino){
                const idPk = await conectApi.recuperaIDPorCampoUserID(usuarioDestino.id);
                if (idPk){
                    setDestinatario({
                        nome: usuarioDestino.nome,
                        email: usuarioDestino.email,
                        id: idPk,
                    }); 
                };
            };    
        };
    };

    // Função que altera o campo "lido" para true quando o usuario vê a mensagem
    const atualizaLeitura = async (idDoChat: string, conversa: Mensagem[]) =>{
        //Verifique se há alguma mensagem não lida para o usuário atual
        if (conversa){
            const temMensagemNaoLida = conversa.some((mensagem: Mensagem) => {
                return mensagem.user_id !== usuarioLogado.usuarioId && !mensagem.lido;
            });
            // Se houver, atualize as mensagens como lidas
            if (temMensagemNaoLida) {
                chatDivScroll.current.scrollTop = chatDivScroll.current.scrollHeight; // Envia o scroll até o final
                if (!await conectApi.atualizaConversaLeitura(chat,usuarioLogado.usuarioId)){
                    handleModal("Erro ao acessar o Banco de dados!", "vermelho");
                };
            };
        };
    };

    // Função que pega a hora baseado no relógio do computador do usuário
    const pegaHora = () => {
        const carimbo = new Date().getTime() / 1000; // Obtém o carimbo Unix
        const data = new Date(carimbo * 1000); // Converte o carimbo para milissegundos e cria um objeto Date
        const horas = data.getHours().toString().padStart(2, '0'); // Obtém as horas no formato 00
        const minutos = data.getMinutes().toString().padStart(2, '0'); // Obtém os minutos no formato 00
        const horaFormatada = `${horas}:${minutos}`; // Formata a hora e os minutos
        return horaFormatada
    };

    // Função que pega a data baseado no relógio do computador do usuário
    const pegaData = () => {
        const data = new Date();
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const dataCompleta = `${ano}-${mes}-${dia}`;
        return dataCompleta;
    };

    const scrollToBottom = () => {
        chatDivScroll.current.scrollTop = chatDivScroll.current.scrollHeight;
    };

    // Função que pega o ID da ultima mensagem para registrar a próxima (DEPRECATED DELETAR)
    const idDaUltimaMensagem = () =>{
        if (!chat){
            return 0;
        } else {
            return chatEmFoco[chatEmFoco.length - 1].id+1;
        };
    };

    // Função que lida o click no botão enviar mensagem
    const handleTextoSubmit = async () => {
        if (!campoValor) {
            handleModal("Escreva alguma mensagem primeiro!", "vermelho");
        } else {
            const todasMensagens = chatEmFoco ? chatEmFoco : [];
            if (destinatario){
                const timestamp = new Date().toLocaleString();
                
                const novaMensagem: Mensagem = ({
                    deletado: false,
                    user: usuarioLogado.usuarioNome,
                    user_id: usuarioLogado.usuarioId,
                    hora: pegaHora(),
                    chat: campoValor,
                    data: pegaData(),
                    lido: false,
                    conversa_id: "", // Não define o valor aqui, será atualizado depois
                    destinatario_id: destinatario.id,
                    destinatario: destinatario?.nome || "",
                    id: idDaUltimaMensagem(),
                    timestamp: timestamp, // Adiciona o timestamp ao objeto novaMensagem
                });
    
                setCampoValor(""); // Limpe o valor do campo
                todasMensagens.push(novaMensagem);
    
                let updatedChat = chat; // Armazena o valor atual de chat
    
                if (!updatedChat) { // Se for a primeira mensagem
                    const novaConversa: Conversa = {
                        deletado: false,
                        user_1_id: usuarioLogado.usuarioId,
                        user_1_nome: usuarioLogado.usuarioNome,
                        user_2_id: destinatario.id,
                        user_2_nome: destinatario?.nome || "",
                    };
                    const resultado = await conectApi.registraConversa(novaConversa)
                    if (!resultado.status) {
                        handleModal(`Houve um erro ao enviar sua mensagem, ${resultado.texto}`, "vermelho");
                    } else {
                        updatedChat = resultado.texto; // Atualiza o valor de chat
                    };
                };
    
                // Atualiza o chat
                setChat(updatedChat);
    
                // Chamada do próximo passo após a atualização de chat
                registraConversa(novaMensagem, updatedChat);
                chatDivScroll.current.scrollTop = chatDivScroll.current.scrollHeight;
                setChatEmFoco(todasMensagens);
            };
        };
    };

    // Função que registra a conversa inicial no BD
    const registraConversa = async (mensagem: Mensagem, chatId: string) => {
        // Define o valor de conversa_id como o ID da conversa
        mensagem.conversa_id = chatId;
        
        const resultado = await conectApi.registraMensagem(chatId, mensagem);
        if (!resultado) {
            handleModal(`Houve um erro ao enviar sua mensagem, ${resultado}`, "vermelho");
        };
        scrollToBottom();
    };

    // Função que gerencia o click nos 3 pontinhos acima do chat e abre as opções
    const handleOptionsClick = () =>{
        setExibeOpcoes(true);
    };

    // Função que gerencia o modal de informações e avisos
    const handleModal = (text: string, corBotao: string) => {
        setModal(true);
        setModalText(text);
        setModalButton(corBotao);
    };

    // Função que valida quando a mensagem foi enviada para retornar "hoje", "ontem" ou "dd/mm"
    const validaData = (item: any) => {
        const dataMensagem = new Date(item.data);
        const hoje = new Date();
        const ontem = new Date(hoje);
        ontem.setDate(hoje.getDate() - 1);
    
        // Ajusta para a mesma hora, minutos, segundos e milissegundos
        hoje.setUTCHours(0, 0, 0, 0);
        ontem.setUTCHours(0, 0, 0, 0);
        dataMensagem.setUTCHours(0, 0, 0, 0);
    
        if (dataMensagem.getTime() === hoje.getTime()) {
            return 'hoje';
        } else if (dataMensagem.getTime() === ontem.getTime()) {
            return 'ontem';
        } else {
            const dd = String(dataMensagem.getDate()).padStart(2, '0');
            const mm = String(dataMensagem.getUTCMonth() + 1).padStart(2, '0');
            return `${dd}/${mm}`;
        }
    };    

    // Função que lida com o clicar no íncone de lixeira para deletar o chat
    const handleDeletChat = () =>{
        setDeletarConversa(true);
        handleModal(`Tem certeza que deseja deletar a conversa com ${ destinatario && destinatario.nome} ?`, "vermelho");
    };

    // Função que registra o chat como "Deletado: true" no banco de dados
    const apagarConversa = async () =>{
        setModal(false)
        setDeletarConversa(false);
        if (chat){
            if (await conectApi.deletaConversa(chat)){
                handleModal("Conversa deletada com sucesso!", "verde");
                setConversaDeletada(true);
            } else {
                handleModal("Erro ao deletar conversa! Contate o administrador!", "vermelho");
            };
        } else {
            handleModal("Não é possível deletar uma conversa que nunca foi iniciada!", "vermelho");
        };
    };

    // Função que gerencia o estado da mensagem para ser excluída
    const handleDeletMessageClick = (id: number) => {
        setMensagemParaExcluir(id);
    };

    // Função que gerencia o estado da mensagem para ser excluída
    const handleDeletMessageCancel = () => {
        setMensagemParaExcluir(null);
    };

    // Função que registra a propriedade "deletado" como true no banco de dados;
    const handleDeletarConfirm = async (id: number) => {
        if (await conectApi.deletaMensagem(chat, id)){
            handleModal("Mensagem deletada com sucesso!", "verde");
            handleDeletMessageCancel();
            pegaMensagens();
        } else {
            handleModal("Erro ao deletar mensagem! Contate o administrador!","vermelho");
        };
    };

    // Conteúdo principal (JSX) do component React
    return(
        <div className={style.pagina}>
            <Cabecalho />
            <section className={style.conteudo}>
                {/* Modal de alertas */}
                {modal && <div className={style.modal_alert}>
                    <Modal altura={0}>
                        <div className={style.modal_alert_content}>
                            <p>{modalText}</p>
                            {deletarConversa ? 
                                <div style={{display:"flex",gap:"3rem"}}>
                                    <Botao texto ="Não" cor={"vermelho"} onClick={() => {
                                            setModal(false);
                                            setExibeOpcoes(false);
                                        }}/>
                                    <Botao texto ="Sim" cor={"verde"} onClick={apagarConversa}/>
                                </div>
                            :
                                conversaDeletada ?
                                <Link to="/menu">
                                    <Botao texto ="OK" cor={modalButton}/>
                                </Link>
                                :
                                <Botao texto ="Ok" cor={modalButton} onClick={() => {setModal(false)}}/>
                            }
                            
                        </div>
                    </Modal>
                </div>}

                <h3 className={style.titulo}>Max Chat</h3>
                <div className={style.conversas}>

                    {/* Modal de carregamento de mensagem */}
                    {!destinatario?.nome && <div className={style.modal_alert}>
                        <Modal altura={0}>
                            <div className={style.modal_alert_content}>
                                <p>Carregando, por favor aguarde.</p>
                                <div className={style.modal_alert_content_loading}>
                                    <Icone icon={"fa-solid fa-spinner"}/>
                                </div>
                            </div>
                        </Modal>
                    </div>}
               
                    <Modal altura={0}> {/* Quando enviar 0 o componente insere "height: auto" */}

                        {/* Modal de opções para deletar o chat inteiro */}
                        <div className={`${chatStyle.chat_options_window} ${exibeOpcoes && `${chatStyle.active}`}`}>
                            <div className={chatStyle.chat_options_container} onClick={()=>{setExibeOpcoes(false)}}>
                                <p>Fechar</p>
                                <Icone icon={"fa-solid fa-slash"}/>
                            </div>
                            <div className={chatStyle.chat_options_container} onClick={handleDeletChat}>
                                <p>Deletar a conversa</p>
                                <Icone icon={"fa-solid fa-trash-can"} cor={"vermelho"}/>
                            </div>
                        </div>

                        {/* Modal de opções para deletar uma mensagem */}
                        <div className={`${chatStyle.chat_options_window} ${exibeOpcoes && `${chatStyle.active}`}`}>
                            <div className={chatStyle.chat_options_container} onClick={()=>{setExibeOpcoes(false)}}>
                                <p>Fechar</p>
                                <Icone icon={"fa-solid fa-x"}/>
                            </div>
                            <div className={chatStyle.chat_options_container} onClick={handleDeletChat}>
                                <p>Deletar a conversa</p>
                                <Icone icon={"fa-solid fa-trash-can"} cor={"vermelho"}/>
                            </div>
                        </div>

                        <div onClick={handleOptionsClick} className={chatStyle.chat_options}><Icone icon={"fa-solid fa-ellipsis"} cor={"branco"}/></div>
                        <div ref={chatDivScroll} className={chatStyle.chat_container}>
                            <p className={chatStyle.chat_titulo}>Conversa com: {destinatario?.nome}</p>
                            {chatEmFoco && chatEmFoco.length === 0 && <p className={chatStyle.chat_titulo}>Ainda sem mensagens, mande a primeira!</p>}
                            {chatEmFoco && chatEmFoco.map((item, index) => {
                            return (
                                <div onClick={()=> !item.deletado && mensagemParaExcluir !== item.id && handleDeletMessageClick(item.id)} key={index} className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_outcome : chatStyle.chat_income)}>
                                    <p className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_outcome_text : chatStyle.chat_income_text)}>
                                        {item.user} disse {validaData(item)} às {item.hora}
                                    </p>
                                    <div className={(item.user === usuarioLogado.usuarioNome ? chatStyle.chat_outcome_balao : chatStyle.chat_income_balao)}>
                                        <Perfil idDoUsuario={item.user_id === usuarioLogado.usuarioId ? item.user_id : destinatario?.id} proChat={true} />
                                        {mensagemParaExcluir === item.id && usuarioLogado.usuarioId === item.user_id ? (
                                            // Renderiza a mensagem de confirmação aqui
                                            <div className={chatStyle.chat_deletar_mensagem_container}>
                                                <p className={chatStyle.chat_deletar_mensagem}>Deletar mensagem?</p>
                                                <div className={chatStyle.chat_deletar_mensagem_buttons}>
                                                    <Botao texto={"Não"} cor={"vermelho"} onClick={()=>handleDeletMessageCancel()}/>
                                                    <Botao texto={"Sim"} cor={"verde"} onClick={()=>handleDeletarConfirm(item.id)}/>
                                                </div>
                                            </div>
                                        ) : (
                                            // Renderiza a mensagem normal aqui
                                            <p className={`${chatStyle.chat_content} ${item.deletado && chatStyle.chat_content_deletado}`}>{item.chat}</p>
                                        )}
                                        {item.lido && item.user === usuarioLogado.usuarioNome ? (
                                            <div className={chatStyle.chat_lido}>
                                                <Icone icon={"fa-regular fa-circle-check"} cor={"branco"} tamanho={"fa-2xs"} />
                                            </div>
                                        ) : (
                                            <p> </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                            {/* Botão flutuante para ancorar ao final da conversa (quando há scroll) */}
                            {botaoScroll && (
                                <div className={chatStyle.chat_container_scroll_button} onClick={scrollToBottom} style={{ position: 'fixed', bottom: '150px', right: '10px' }}>
                                    <Icone icon={"fa-solid fa-circle-arrow-down"} cor={"branco"}/>
                                    <p>ir para o final</p>
                                </div>
                            )}

                            <hr style={{width:"90%"}}/>
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
