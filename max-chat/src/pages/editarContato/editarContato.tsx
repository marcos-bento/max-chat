import React, { useEffect, useState } from "react";
import style from "../../Common/CSS/conteudo.module.css"
import styleContato from "./editarContato.module.css"
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Balao from "../../components/balao/balao";
import BotaoGrande from "../../components/botaoGrande/botaoGrande";
import Modal from "../../components/modal/modal";
import Perfil from "../../components/imagemDePerfil/perfil";
import Input from "../../components/formulario/input/input";
import { useUser } from "../../Services/userContext";
import { conectApi } from "../../Services/conectaApi";
import { useContatoEmFoco } from "../../Services/contatoContext";
import Botao from "../../components/botao/botao";

function EditarContato(){
    const { usuarioLogado } = useUser();
    const [ dadosDoContato, setDadosDoContato ] = useState<{ user_id: string; email: string, nome: string, apelido: string }>();
    const { contatoEmFoco } = useContatoEmFoco();
    const [apelido, setApelido] = useState("");
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalButton, setModalButton] = useState("");
    const [modoDeletarContato, setModoDeletarContato] = useState(false);
    const [modoAtualizar, setModoAtualizar] = useState(false);
    const [contatoDeletado, setContatoDeletado] = useState(false);
    const [modoLimparApelido, setModoLimparApelido] = useState(false);

    //useEffect principal
    useEffect(() =>{
        if (!usuarioLogado){ // Se não estiver logado
            window.location.href="/" // Redireciona para tela de Login
        };
 
        recuperaContato();
    },[]);

    // Função responsável por acessar o BD e extrair os dados do contato a ser editado.
    const recuperaContato = async () =>{
        const contatos = await conectApi.recuperaContatosPorID(usuarioLogado.usuarioId);
        if (contatos){
            const destinatario = contatos.find((contato: { email: string; }) => contato.email === contatoEmFoco);
            setDadosDoContato(destinatario);
        };
    };

    // Função para gerenciar o estado do Input Apelido
    const handleApelidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApelido(event.target.value);
    };

    // Função para lidar com o botão Atualizar Contato
    const handleAtualizarContato = () =>{
        if (apelido && apelido !== dadosDoContato?.apelido){
            handleModal(`Tem certeza que deseja atualizar o contato de ${dadosDoContato?.nome}?`, "verde");
            setModoAtualizar(true);
        } else {
            handleModal(`Se quer atualizar o apelido de ${dadosDoContato?.nome}, precisa ser diferente do anterior!`, "vermelho");
        };
    };

    // Função para lidar com o botão Apagar Contato
    const handleApagarContato = () =>{
        handleModal(`Tem certeza que deseja deletar da sua lista de contatos: ${dadosDoContato?.nome}? Isso não apagará suas conversas!`, "verde");
        setModoDeletarContato(true);
    };

    // Função para lidar com o Modal
    const handleModal = (text: string, corBotao: string) => {
        setModal(true);
        setModalText(text);
        setModalButton(corBotao);
    };

    // Função responsável por limpar os estados de controle
    const handleModalOk = () => {
        setModal(false);
        setModoDeletarContato(false);
        setModoAtualizar(false);
        setModoLimparApelido(false);
    };

    // Função responsável por atualizar o contato da lista do usuário
    const handleModalOkAtualiza = async () => {
        const resultado = await conectApi.atualizarApelidoDoContato(usuarioLogado.usuarioId, contatoEmFoco ,apelido);
        setModal(false);
        setModoAtualizar(false);
        handleModal(resultado, "verde");
        recuperaContato();
    };

    // Função responsável por deletar o contato da lista do usuário
    const handleModalOkDeletar = async () => {
        const resultado = await conectApi.deletarContatoPorId(usuarioLogado.usuarioId, contatoEmFoco);
        setModal(false)
        setModoDeletarContato(false);
        setContatoDeletado(true);
        handleModal(resultado, "verde");
    };

    // Função responsável por gerenciar o click do botão "Limpar apelido"
    const handleDeleteAlias = () => {
        handleModal(`Tem certeza que deseja deletar o apelido de ${dadosDoContato && dadosDoContato.apelido}?`, "vermelho");
        setModoLimparApelido(true);
    };

    // Função responsável por editar o apelido do contato para "" e salvar no bd
    const handleModalOkDeletarAlias = async () => {
        setModoLimparApelido(false);
        const resultado = await conectApi.atualizarApelidoDoContato(usuarioLogado.usuarioId, contatoEmFoco ,""); 
        handleModal(resultado,"verde");  
        recuperaContato();
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
                            {/* Botões para atualizar o contato:  */}
                            {modoAtualizar && !modoDeletarContato &&
                                (
                                    <div className={style.modal_alert_content_double_button}>
                                        <Botao texto ="Não" cor={"vermelho"} onClick={handleModalOk}/>
                                        <Botao texto ="Sim" cor={modalButton} onClick={handleModalOkAtualiza}/>
                                    </div>
                                )
                            }
                            
                            {/* Botões para deletar o contato: */}
                            {modoDeletarContato && !modoAtualizar &&
                                (
                                    <div className={style.modal_alert_content_double_button}>
                                        <Botao texto ="Cancelar" cor={"verde"} onClick={handleModalOk}/>
                                        <Botao texto ="Deletar" cor={"vermelho"} onClick={handleModalOkDeletar}/>
                                    </div>
                                )
                            }

                            {/* Botões para limpar apelido: */}
                            {modoLimparApelido &&
                                (
                                    <div className={style.modal_alert_content_double_button}>
                                        <Botao texto ="Cancelar" cor={"verde"} onClick={handleModalOk}/>
                                        <Botao texto ="Deletar" cor={"vermelho"} onClick={handleModalOkDeletarAlias}/>
                                    </div>
                                )
                            }

                            {/* Botão normal */}
                            {!modoLimparApelido && !modoAtualizar && !modoDeletarContato && !contatoDeletado && <Botao texto ="Ok" cor={modalButton} onClick={handleModalOk}/>}

                            {/* Botão normal pós deletar*/}
                            {contatoDeletado && 
                                <Link to="/contatos">
                                    <Botao texto ="Ok" cor={modalButton}/>
                                </Link>
                            }
                        </div>
                    </Modal>
                </div>}
                <h3 className={style.titulo}>Editar contato</h3>
                <div className={style.conversas}>
                    <Modal altura={0}>
                        <div className={styleContato.containerContato}>
                            <div className={styleContato.containerSuperior}>
                                <div>
                                    <p>Contato: {dadosDoContato?.nome}</p>
                                    <p>conhecido como:</p>
                                </div>
                                <div>
                                    {dadosDoContato && <Perfil emailDoUsuario={dadosDoContato.email}/>}
                                </div>
                            </div>
                            <Input placeholder={(dadosDoContato?.apelido ? dadosDoContato.apelido : "Digite o apelido para o contato") } onChange={handleApelidoChange}/>
                            {dadosDoContato && dadosDoContato.apelido && <Botao texto={"Limpar apelido"} cor={"vermelho"} onClick={handleDeleteAlias}/>}
                        </div>
                    </Modal>
                    <Balao tipo={"botao"} icone={"fa-solid fa-check"} cor={"verde"} texto={"Atualizar contato"} onClick={handleAtualizarContato}/>
                    <Balao tipo={"botao"} icone={"fa-solid fa-x"} cor={"vermelho"} texto={"Apagar contato"} onClick={handleApagarContato}/>
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

export default EditarContato;
